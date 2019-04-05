from django.urls import path

from . import views

urlpatterns = [
    path('', views.PlayerList.as_view(), name='player_list'),
    path('view/<int:pk>', views.player.as_view(), name='player_view'),
    path('new', views.playerCreate.as_view(), name='player_new'),
    path('view/<int:pk>', views.playerView.as_view(), name='player_view'),
    path('edit/<int:pk>', views.playerUpdate.as_view(), name='player_edit'),
    path('delete/<int:pk>', views.playerDelete.as_view(), name='player_delete'),
]