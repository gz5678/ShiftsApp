from rest_framework import serializers
from .models import ShiftsUser, Position, UserPosition


class CreateUserSerializer(serializers.ModelSerializer):
    team_lead = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ShiftsUser
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'team_lead',)

    def get_team_lead(self, obj):
        # Return the team lead if we are in the post situation. In this case, self has the initial data of the request.
        if hasattr(self, 'initial_data'):
            return self.initial_data.get('team_lead')
        # Otherwise, obj is a user and we return the name of the group the user is in
        else:
            return obj.groups.all()[0].name

class GetTeamLeadsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftsUser
        fields = ('username', 'first_name', 'last_name')

class GetTeamLeadGroupUsers(serializers.ModelSerializer):
    class Meta:
        model = ShiftsUser
        fields = ('first_name', 'last_name')

class GetPositions(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = ('name',)

class UserPosition(serializers.ModelSerializer):
    class Meta:
        model = UserPosition
        fields = ('date', 'user', 'position')