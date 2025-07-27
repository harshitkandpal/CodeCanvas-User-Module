# from rest_framework import generics, status, permissions
from rest_framework import status, generics
from .serializers import RegistrationSerializer, EmailVerificationSerializer, LoginSerializer, LogoutSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.utils import timezone
from rest_framework.response import Response
from .utils import otp_generator, email_sender, cache_otp, get_cached_otp , delete_cached_otp
from .models import Users
# from rest_framework.simplejwt.tokens import RefreshToken
    

# register login logout

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)
    
class EmailVerificationView(generics.GenericAPIView):
    serializer_class = EmailVerificationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception = True)
        email = serializer.validated_data['email']
        otp =  otp_generator()
        content = f"""
                    OTP Verification.
                    Your otp {otp}.
                    Please do not share you otp. Valid for 5mins.
                """
        subject = "Email Verification"
        email_sender(email=email,subject=subject,content=content)
        cache_otp(email=email, otp=otp)
        return Response({
            "message": f"Otp sent to {email}"
        }, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email=serializer.validated_data.get('email')
        otp=serializer.validated_data.get('otp')
        cached = get_cached_otp(email)
        if cached is None:
            return Response({"error": "OTP expired or invalid"}, status=400)
        if cached != otp:
            return Response({"error": "Incorrect OTP"}, status=400)
        if cached == otp:
            delete_cached_otp(email)
            user = Users.objects.filter(email=email)
            if not user.exists():
                return Response({"error": "User not found"}, status=404)

            user.update(is_valid=True)  # ✅ assumes field exists
            return Response({
                'email_verified': True
            }, status=status.HTTP_200_OK)


    
class LoginView(generics.GenericAPIView):
    serializer_class =  LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if not user.is_valid:
            return Response(
                        {
                            "detail": "Email not verified. Please verify your email to continue.",
                            "error_type": "email_not_verified"
                        },
                        status=status.HTTP_403_FORBIDDEN
                    )

        refresh = RefreshToken.for_user(user)
        
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user': {
                'email': user.email,
                'username': user.username,
                'profile_pic': user.profile_pic.url if user.profile_pic else None,
                'role': user.role
            }
        }, status=status.HTTP_200_OK)

class LogoutView(generics.GenericAPIView):
    permission_class = [IsAuthenticated]
    serializer_classes=LogoutSerializer

    def post(self, request):
        serializer = self.get_serializer(dara=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data.get('refresh')

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
        except TokenError:
            return Response(
                {"error": "Invalid or expired refresh token."},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"message": "Logout successful."},
            status=status.HTTP_205_RESET_CONTENT
        )

    
