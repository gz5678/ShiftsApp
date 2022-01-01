from django.urls import path
from .views import CreateUserView, GetTeamLeadGroupUsers, GetPositions, UserPosition
urlpatterns = [
    path('user/', CreateUserView.as_view()),
    path('team/<str:username>', GetTeamLeadGroupUsers.as_view()),
    path('position/', GetPositions.as_view()),
    path('position/<int:id>', GetPositions.as_view()),
    path('userposition/', UserPosition.as_view()),
    path('userposition/<int:user_id>', UserPosition.as_view()),
    path('userposition/<int:user_id>/<int:position_id>', UserPosition.as_view()),
]