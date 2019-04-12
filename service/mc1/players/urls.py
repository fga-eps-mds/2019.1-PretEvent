from django.urls import path
from rest_framework import routers
from players import views

app_name = 'players'

urlpatterns = [
    path('', views.PlayerList.as_view(), name='players'),
    path('view/<int:pk>', views.PlayerDetail(), name='player-detail'),
]