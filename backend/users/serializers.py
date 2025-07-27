from rest_framework import serializers
from .models import Users

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['email', 'password', 'username', 'profile_pic', 'role']
        extra_kwargs = {
            'password': {'write_only': True},
            'profile_pic': {'default': 'my-dummy-profile_pic-urls'},
        }

    def validate_password(self, value):
        if len(value)<8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value
        
class EmailVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(required=False, max_length=10)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = Users.objects.get(email=data["email"])
        except Users.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        
        if not user.check_password(data['password']):
            raise serializers.ValidationError("Incorrect password.")
        
        data['user'] = user
        return data

class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
