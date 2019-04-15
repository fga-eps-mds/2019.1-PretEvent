from eventos.models import Evento
from rest_framework import serializers

class EventoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'title','date','points','description','url_image')

    def create(self, validated_data):
        evento = Evento(
            title = validated_data['title'],
            date = validated_data['date'],
            points = validated_data['points'],
            description = validated_data['description'],
            url_image = validated_data['url_image']
        )
        evento.save()
        return evento

class EventoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'title','date','points','description','url_image')

    def update(self, instance, validated_data):
        instance.title =  validated_data.get('title', instance.title)
        instance.date = validated_data.get('date', instance.date)
        instance.points = validated_data.get('points', instance.points)
        instance.description = validated_data.get('description', instance.description)
        instance.url_image = validated_data.get('url_image', instance.url_image)

        instance.save()
        return instance

class EventoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'title','date','points','description','url_image')
