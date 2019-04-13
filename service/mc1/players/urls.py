from django.urls import path
from rest_framework import routers
from players import views
from .views import PlayerList
from .views import PlayerDetail

app_name = "players"

urlpatterns = [
    #path('', views.PlayerList.as_view(), name='players'),
    #path('view/<int:pk>', views.PlayerDetail(), name='player-detail'),
    path('players', PlayerList.as_view()),
    path('players/<int:pk>', PlayerDetail.as_view()),
]