from django.db import models
from django.contrib.auth.hashers import make_password

class Users(models.Model):
    ROLE_CHOICES = [
        (1, "developer"),
        (2, "client"),
        (3, "mentor"),
        (4, "admin"),
    ]

    email = models.EmailField(unique=True, null=False)
    username = models.CharField(max_length=255, unique=True, null=False)
    password = models.CharField(max_length=255, null=False)
    profile_pic = models.URLField(default="my-dummy-profile_pic-urls")
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=1)
    is_valid = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} | {self.username} | is_valid: {self.is_valid} | is_active: {self.is_active} | last_login: {self.last_login}"
    
class Otp(models.Model):
    email = models.OneToOneField(Users, on_delete=models.CASCADE)
    otp = models.CharField(max_length=8,null=False,unique=True)
    expires_at = models.DateTimeField(null=False)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.email}"

class JwtTokens(models.Model):
    user = models.OneToOneField(Users,on_delete=models.CASCADE)
    refresh_token = models.CharField(max_length=255, null=False)
    user_agent = models.CharField(max_length=255)
    ip_address = models.GenericIPAddressField()
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_revoked = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} | {self.refresh_token} | {self.ip_address}"

class DeveloperProfile(models.Model):
    user =  models.OneToOneField(Users, on_delete=models.CASCADE)
    bio =  models.TextField()
    skills = models.JSONField(default=list, blank=True)
    tech_stack = models.JSONField(default=list, blank=True)
    portfolio_link = models.URLField()
    github_url = models.URLField()
    linkedin_url = models.URLField()
    competative_coding_profile = models.URLField()

    class Meta:
        verbose_name_plural = "Developer Profiles"

    def __str__(self):
        return f"{self.user}"

class ClientProfile (models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255, null=False, blank=False)
    project_needs = models.TextField()

    class Meta:
        verbose_name_plural = "Client Profiles"

    def __str__(self):
        return f"{self.user}"

class MentorProfile(models.Model):
    user = models.OneToOneField(Users, on_delete=models.CASCADE)
    bio = models.TextField()
    specializations = models.JSONField(default=list, blank=True)
    hourly_rate = models.DecimalField(max_digits=10,decimal_places=2)
    available_slots = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name_plural = "Mentor Profiles"

    def __str__(self):
        return f"{self.user}"
