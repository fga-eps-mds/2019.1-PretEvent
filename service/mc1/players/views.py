from django.contrib.auth.models import User
from rest_framework import viewsets
from rest_framework import status
from players.serializers import PlayerCreateSerializer, PlayerUpdateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from django.http import Http404


from players.models import Player

class PlayerList(APIView):

    queryset = Player.objects.all()

    serializer_class = PlayerCreateSerializer

    def get_extra_actions():
        return []

    def get(self, request, format=None):
        players = Player.objects.all()
        serializer = PlayerCreateSerializer(players, many = True)

        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = PlayerCreateSerializer(data = request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

class PlayerDetail(APIView):

    serializer_class = PlayerCreateSerializer

    def get_object(self, pk):
        try:
            return Player.objects.get(pk=pk)
        except Player.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        player = self.get_object(pk)
        serializer = PlayerCreateSerializer(player)

        return Response(serializer.data)

    def put(self, request, pk, format=None):
        player = self.get_object(pk)
        serializer = PlayerUpdateSerializer(player, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        player = self.get_object(pk)
        player.delete()

        return Response(status = status.HTTP_204_NO_CONTENT)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })
