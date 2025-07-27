from django.urls import path
from .views import RegistrationView, EmailVerificationView, LoginView

urlpatterns = [
    path('register/',RegistrationView.as_view(), name='Registration'),
    path('verify-email/', EmailVerificationView.as_view(), name='verify-email'),
    path('login/', LoginView.as_view(), name='login')
]