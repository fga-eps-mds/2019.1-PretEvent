from eventos.models import Evento
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from eventos.serializers import EventoCreateSerializer

class EventList(APIView):

    queryset = Evento.objects.all()
    serializer_class = EventoCreateSerializer

    def get_extra_actions():
        return []

    def get(self, request, format=None):
        eventos = Evento.objects.all()
        serializer = EventoCreateSerializer(eventos, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = EventoCreateSerializer(data = request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
# Create your views here.
