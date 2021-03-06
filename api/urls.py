from django.urls import path, include
from .views import CreateUserView, GetTeamLeadGroupUsers, GetPositions, UserPosition, GetTeamLeads
urlpatterns = [
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', CreateUserView.as_view()),
    path('user/teamleads/', GetTeamLeads.as_view()),
    path('team/<str:username>', GetTeamLeadGroupUsers.as_view()),
    path('position/', GetPositions.as_view()),
    path('position/<int:id>', GetPositions.as_view()),
    path('userposition/', UserPosition.as_view()),
    path('userposition/<int:user_id>', UserPosition.as_view()),
    path('userposition/<int:user_id>/<int:position_id>', UserPosition.as_view()),
]