from players.models import Player
from rest_framework import serializers

class PlayerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name', 'university_id', 'points', 'photo_url')

    def create(self, validated_data):
        player = Player (
            name = ['name'],
            university_id = ['university_id'],
            points = ['points'],
            photo_url = ['photo_url']
        )
        player.save()
        return player

class PlayerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name', 'university_id', 'points', 'photo_url')

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.university_id = validated_data.get('university_id', instance.university_id)
        instance.points = validated_data.get('points', instance.points)
        instance.photo_url = validated_data.get('photo_url', instance.photo_url)
             
        instance.save()
        return instance

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name', 'university_id', 'points', 'photo_url')