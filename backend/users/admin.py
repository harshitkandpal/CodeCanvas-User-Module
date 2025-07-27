from django.contrib import admin
from .models import Users, DeveloperProfile, ClientProfile, MentorProfile
# Register your models here.
admin.site.register(Users)
admin.site.register(DeveloperProfile)
admin.site.register(ClientProfile)
admin.site.register(MentorProfile)