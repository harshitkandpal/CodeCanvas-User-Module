# from rest_framework import generics, status, permissions
from rest_framework import status, generics
from .serializers import RegistrationSerializer, LoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils import timezone
from .models import Users, JwtTokens
from rest_framework.response import Response
from rest_framework.decorators import api_view

# from rest_framework.simplejwt.tokens import RefreshToken


# Create your views here.
@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello World"})
    

# register login logout

class RegistrationView(generics.CreateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        ip = request.META.get('REMOTE_ADDR', '')

        JwtTokens.objects.create(
            user=user,
            refresh_token=str(refresh),
            user_agent=user_agent,
            ip_address=ip,
            created_at=timezone.now(),
            updated_at=timezone.now() + timezone.timedelta(days=7)  # Token valid for 7 days
        )

        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)
    
class LoginView(generics.GenericAPIView):
    serializer_class =  LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        refreshToken = RefreshToken.for_user(user)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        ip = request.META.get('REMOTE_ADDR', '')
        JwtTokens.objects.update_or_create(
            user=user,
            defaults={
                'refresh_token': str(refreshToken),
                'user_agent': user_agent,
                'ip_address': ip,
                'created_at': timezone.now(),
                'expires_at': timezone.now() + timezone.timedelta(days=7),  # Token valid for 7 days
                'is_revoked': False,
            }
        )
        return Response({
            'access': str(refreshToken.access_token),
            'refresh': str(refreshToken),
            'user': {
                'email': user.email,
                'username': user.username,
                'profile_pic': user.profile_pic.url if user.profile_pic else None,
                'role': user.role
            }
        }, status=status.HTTP_200_OK)

