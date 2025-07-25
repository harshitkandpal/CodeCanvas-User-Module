from django.contrib import admin
from .models import Users, Otp, JwtTokens, DeveloperProfile, ClientProfile, MentorProfile
# Register your models here.
admin.site.register(Users)
admin.site.register(Otp)
admin.site.register(JwtTokens)
admin.site.register(DeveloperProfile)
admin.site.register(ClientProfile)
admin.site.register(MentorProfile)