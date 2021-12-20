from django.urls import path
from .views import CreateUserView, GetTeamLeadGroupUsers, GetPositions
urlpatterns = [
    path('createUser', CreateUserView.as_view()),
    path('team/<str:username>', GetTeamLeadGroupUsers.as_view()),
    path('positions/<int:id>', GetPositions.as_view()),

]