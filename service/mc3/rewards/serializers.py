from rest_framework import serializers
from rewards.models import Reward

class RewardCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reward
        fields = ('id','title','description','points','badge_url')

    def create(self, validated_data):
        reward = Reward(
            title = validated_data['title'],
            description = validated_data['description'],
            points = validated_data['points'],
            badge_url = validated_data['badge_url'])
        reward.save()
        return reward
