from rest_framework import serializers
from .models import ShiftsUser


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftsUser
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'team_lead')