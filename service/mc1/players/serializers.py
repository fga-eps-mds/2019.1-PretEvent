from players.models import Player
from rest_framework import serializers

class PlayerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'username', 'password', 'university_id', 'points', 'photo_url')

    def create(self, validated_data):
        player = Player.objects.create_user (
            username = validated_data['username'],
            password = validated_data['password'],
            university_id = validated_data['university_id'],
            points = validated_data['points'],
            photo_url = validated_data['photo_url']
        )
        player.save()
        return player

class PlayerUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'username', 'password', 'university_id', 'points', 'photo_url')

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.password = validated_data.get('password', instance.password)
        instance.university_id = validated_data.get('university_id', instance.university_id)
        instance.points = validated_data.get('points', instance.points)
        instance.photo_url = validated_data.get('photo_url', instance.photo_url)
            
        instance.save()
        return instance

class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'username', 'password', 'university_id', 'points', 'photo_url')
