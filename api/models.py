from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey

# Create your models here.

class ShiftsUser(User):
    is_team_lead = models.BooleanField(verbose_name="is_team_lead", default=False)

class Position(models.Model):
    name = models.CharField(verbose_name="Position Name", max_length=100, unique=True)

class UserPositions(models.Model):
    date = models.DateField()
    user = ForeignKey(ShiftsUser, on_delete=models.CASCADE)
    positions = ForeignKey(Position, on_delete=models.CASCADE)