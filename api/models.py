from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class ShiftsUser(User):
    is_team_lead = models.BooleanField(verbose_name="is_team_lead", default=False)

class Positions:
    name = models.CharField(verbose_name="Position Name", max_length=100, unique=True)
