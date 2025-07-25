# from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view
# from rest_framework.simplejwt.tokens import RefreshToken


# Create your views here.
@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello World"})
    