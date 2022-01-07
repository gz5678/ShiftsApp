from django.db import models
from django.contrib.auth.models import User
from django.db.models.fields.related import ForeignKey

# Create your models here.

class ShiftsUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_team_lead = models.BooleanField(verbose_name="is_team_lead", default=False)

class Position(models.Model):
    name = models.CharField(verbose_name="Position Name", max_length=100, unique=True)

    def __str__(self):
        return self.name

class UserPosition(models.Model):
    date = models.DateField()
    user = ForeignKey(User, on_delete=models.CASCADE)
    position = ForeignKey(Position, on_delete=models.CASCADE)