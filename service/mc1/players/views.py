from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from rest_framework import viewsets
from players.serializers import PlayerSerializer

from players.models import Player

class PlayerList(ListView):
    model = Player
class PlayerView(DetailView):
    model = Player
class PlayerCreate(CreateView):
    model = Player
    fields = ['id','name', 'university_id', 'points', 'photo_url']
    success_url = reverse_lazy('player_list')
class PlayerUpdate(UpdateView):
    model = Player
    fields = ['id','name', 'university_id', 'points', 'photo_url']
    success_url = reverse_lazy('player_list')

class PlayerDelete(DeleteView):
    model = Player
    success_url = reverse_lazy('player_list') 
    success_url = reverse_lazy('player_list')

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all().order_by('id')
    serializer_class = PlayerSerializer 