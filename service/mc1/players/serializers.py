from django.contrib.auth.models import User, Group
from rest_framework import serializers

class PlayerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'name', 'university_id', 'points', 'photo_url')