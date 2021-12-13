from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User, Group


class CreateUserView(APIView):
    def post(self, request, format=None):
        pass