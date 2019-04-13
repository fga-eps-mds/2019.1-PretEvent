from eventos.models import Evento
from rest_framework import serializers

class EventoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('title','date','points','description')

    def create(self, validated_data):
        evento = Evento(title = ['title'], date = ['date'], points = ['points'], description = ['description'])
        evento.save()
        return evento
