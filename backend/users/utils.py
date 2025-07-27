from random import randint
from django.core.mail import send_mail
from django.core.cache import cache
from django.conf import settings
import os

#otp_generator, email_sender, verify_otp, refresh_Token_gnerator, access_toker_generator, token_manger(add remove expiry token regenerates etc) 
#OAuth in future

def otp_generator ():
    length = int(os.environ.get('OTP_LENGTH', 8))
    return ''.join(str(randint(0,9)) for _ in range(length))

def email_sender(email,subject, content):
    send_mail(
        subject = subject,
        message = content,
        from_email = settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False
    )
    return True

def cache_otp(email, otp, timeout=300):
    cache.set(f"otp:{email}", otp, timeout=timeout)

def get_cached_otp(email):
    return cache.get(f"otp:{email}")

def delete_cached_otp(email):
    return cache.delete(f"otp:{email}")