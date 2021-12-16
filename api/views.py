from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import Group
from .serializers import CreateUserSerializer
from .models import ShiftsUser

class CreateUserView(APIView):

    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        # TODO:CHECK IF NEED SESSION
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.get('username')
            password = serializer.data.get('password')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            email = serializer.data.get('email')
            team_lead = serializer.data.get('team_lead')
            queryset = ShiftsUser.objects.filter(username=username, email=email)
            if queryset.exists():
                # TODO: A user already exists, return error
                return
            else:
                user = ShiftsUser.objects.create_user(username, email, password)
                user.first_name = first_name
                user.last_name = last_name
                # User is a new team lead
                if team_lead == "I am a team lead":
                    user.is_team_lead = True
                    # Don't neet to check if the group exists since username is unique
                    team_lead_group = Group.objects.create(name=f"{username}")
                    user.groups.add(team_lead_group)
                    # For now, a team lead is also the team lead of itself
                    user.team_lead = username
                else:
                    # User is not a team lead. Get team lead and save to field.
                    user.is_team_lead = False
                    team_lead_group = Group.objects.get(name=f"{team_lead}") # Have the frontend map between user name and first + last name
                    user.groups.add(team_lead_group)
                    user.team_lead = team_lead
                user.save()
                return Response(CreateUserSerializer(user).data, status=status.HTTP_201_CREATED)
        return # TODO: Return some error code response