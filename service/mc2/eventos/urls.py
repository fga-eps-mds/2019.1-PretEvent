from django.urls import path
from rest_framework import routers
from .views import EventList, EventDetail, Evento_Player
from eventos import views

app_name = "eventos"

urlpatterns = [
    path('eventos/', EventList.as_view()),
    path('eventos/<int:pk>', EventDetail.as_view()),
    path('eventos_player/', Evento_Player.as_view()),
]
