"""mc1 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from players import views
from rest_framework_jwt.views import refresh_jwt_token, verify_jwt_token
from rest_framework_jwt.views import obtain_jwt_token

router = routers.DefaultRouter()
router.register(r'players', views.PlayerList)

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('player/', include('players.urls')),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/', include('players.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('refresh-token/', refresh_jwt_token),
    path('verify-token/', verify_jwt_token),
    path('obtain-token/', obtain_jwt_token),
]
