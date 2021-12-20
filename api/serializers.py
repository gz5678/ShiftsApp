from rest_framework import serializers
from .models import ShiftsUser, Position


class CreateUserSerializer(serializers.ModelSerializer):
    team_lead = serializers.CharField()

    class Meta:
        model = ShiftsUser
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

class GetTeamLeadGroupUsers(serializers.ModelSerializer):
    class Meta:
        model = ShiftsUser
        fields = ('first_name', 'last_name')

class GetPositions(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('name',)