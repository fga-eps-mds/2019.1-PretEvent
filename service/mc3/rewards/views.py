from rewards.models import Reward
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from rewards.serializers import RewardCreateSerializer

class RewardList(APIView):

    def get_extra_actions():
        return []

    serializer_class = RewardCreateSerializer
    queryset = Reward.objects.all()

    def get(self, request, format=None):
        rewards = Reward.objects.all()
        serializer = RewardCreateSerializer(rewards, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = RewardCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RewardDetail(APIView):

    def get_object(self, pk):
        try:
            return Reward.objects.get(pk=pk)
        except Reward.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        reward = self.get_object(pk)
        serializer = RewardCreateSerializer(reward)
        return Response(serializer.data)
