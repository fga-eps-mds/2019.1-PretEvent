from django.urls import path
from rest_framework import routers
from .views import EventList, EventDetail
from eventos import views

app_name = "eventos"

urlpatterns = [
    path('eventos/', EventList.as_view()),
    path('eventos/<int:pk>', EventDetail.as_view()),
]
