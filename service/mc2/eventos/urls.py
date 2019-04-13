from django.urls import path
from rest_framework import routers
from .views import EventList
from eventos import views

app_name = "eventos"

urlpatterns = [
    path('eventos/', EventList.as_view()),
]
