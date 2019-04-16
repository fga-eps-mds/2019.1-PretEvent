from rest_framework import routers
from django.urls import path
from rewards import views
from .views import RewardList, RewardDetail

app_name = "rewards"

urlpatterns = [
    path('rewards/', RewardList.as_view()),
    path('rewards/<int:pk>', RewardDetail.as_view()),
    ]
