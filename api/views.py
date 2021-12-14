from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User, Group
from .serializers import CreateUserSerializer
from .models import ShiftsUser
from ..shift_app.settings import IS_TEAM_LEAD


class CreateUserView(APIView):

    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            username = serializer.data.username
            password = serializer.data.password
            first_name = serializer.data.first_name
            last_name = serializer.data.last_name
            email = serializer.data.email
            team_lead = serializer.data.team_lead
            queryset = User.objects.filter(username=username, email=email)
            if queryset.exists():
                # TODO: A user already exists, return error
                return
            else:
                user = User.objects.create_user(username, email, password)
                user.first_name = first_name
                user.last_name = last_name
                if team_lead == IS_TEAM_LEAD:
                    user.is_team_lead = True
                    team_lead_group = Group.objects.create(name=f"{username}")
                    user.groups.add(team_lead_group)
                else:
                    user.is_team_lead = False
                    team_lead_group = Group.objects.get(name=f"{team_lead}")
                    user.groups.add(team_lead_group)
                user.save()
                return # TODO: REDIRECT OR RETURN SOME STATUS
        return # TODO: Return some error code response