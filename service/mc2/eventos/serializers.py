from eventos.models import Evento, Evento_Player
from rest_framework import serializers


class EventoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'title', 'date', 'points',
                  'description', 'url_image', 'reward_id', 'creator_id')

    def create(self, validated_data):
        evento = Evento(
            title=validated_data['title'],
            date=validated_data['date'],
            points=validated_data['points'],
            description=validated_data['description'],
            url_image=validated_data['url_image'],
            reward_id=validated_data['reward_id'],
            creator_id=validated_data['creator_id']
        )
        evento.save()
        return evento


class Evento_PlayerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento_Player
        fields = ('id', 'player_id', 'evento_id')

    def create(self, validated_data):
        evento_player = Evento_Player(
            player_id=validated_data['player_id'],
            evento_id=validated_data['evento_id'],
        )
        evento_player.save()
        return evento_player


class EventoUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'title', 'date', 'points',
                  'description', 'url_image', 'reward_id', 'creator_id')

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.date = validated_data.get('date', instance.date)
        instance.points = validated_data.get('points', instance.points)
        instance.description = validated_data.get(
            'description', instance.description)
        instance.url_image = validated_data.get(
            'url_image', instance.url_image)
        instance.reward_id = validated_data.get(
            'reward_id', instance.reward_id)
        instance.creator_id = validated_data.get(
            'creator_id', instance.creator_id)

        instance.save()
        return instance


class EventoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evento
        fields = ('id', 'title', 'date', 'points',
                  'description', 'url_image', 'reward_id', 'creator_id')
