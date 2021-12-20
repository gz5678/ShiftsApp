from django.urls import path
from .views import CreateUserView, GetTeamLeadGroupUsers
urlpatterns = [
    path('createUser', CreateUserView.as_view()),
    path('getTeam/<str:username>', GetTeamLeadGroupUsers.as_view())
]