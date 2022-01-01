from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import Group
from .serializers import CreateUserSerializer, GetTeamLeadGroupUsers, GetPositions, UserPosition
from .models import ShiftsUser, Position, UserPosition as UserPositionModel

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
                else:
                    # User is not a team lead. Get team lead and save to field.
                    user.is_team_lead = False
                    team_lead_group = Group.objects.get(name=f"{team_lead}") # Have the frontend map between user name and first + last name
                    user.groups.add(team_lead_group)
                user.save()
                return Response(self.serializer_class(user).data, status=status.HTTP_201_CREATED)
        return Response(f"Couldn't validate data: {request.data}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GetTeamLeadGroupUsers(APIView):

    serializer_class = GetTeamLeadGroupUsers

    def get(self, request, username, format=None):
        if username:
            users = ShiftsUser.objects.filter(groups__name=f"{username}")
            return Response(self.serializer_class(users, many=True).data, status=status.HTTP_200_OK)
        else:
            pass
            #TODO: Username has to be given

class GetPositions(APIView):
    serializer_class = GetPositions

    def get(self, request, id=None, format=None):
        if id:
            position = Position.objects.get(pk=id)
            return Response(self.serializer_class(position).data, status=status.HTTP_200_OK)
        else:
            positions = Position.objects.all()
            return Response(self.serializer_class(positions, many=True).data, status=status.HTTP_200_OK)

class UserPosition(APIView):
    serializer_class = UserPosition

    def post(self, request, format=None):
        # TODO:CHECK IF NEED SESSION
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            date = serializer.data.get('date')
            user = ShiftsUser.objects.get(pk=serializer.data.get('user'))
            position = Position.objects.get(pk=serializer.data.get('position'))
            userposition = UserPositionModel(date=date, user=user, position=position)
            userposition.save()
            return Response(f"User {user.username} manned position {position.name} on {date} saved successfuly", status=status.HTTP_200_OK)
        return Response(f"Couldn't save user manning position: {request.data}", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request, id=None, format=None):
        if id:
            userposition = UserPositionModel.objects.get(pk=id)
            return Response(self.serializer_class(userposition).data, status=status.HTTP_200_OK)
        else:
            userpositions = UserPositionModel.objects.all()
            return Response(self.serializer_class(userpositions, many=True).data, status=status.HTTP_200_OK)