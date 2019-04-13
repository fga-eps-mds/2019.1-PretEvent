from eventos.models import Evento
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from eventos.serializers import EventoCreateSerializer, EventoUpdateSerializer

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
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetail(APIView):

    serializer_class = EventoCreateSerializer

    def get_object(self, pk):
        try:
            return Evento.objects.get(pk=pk)
        except Evento.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        evento = self.get_object(pk)
        serializer = EventoCreateSerializer(evento)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        evento = self.get_object(pk)
        serializer = EventoUpdateSerializer(evento, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        evento = self.get_object(pk)
        evento.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)
