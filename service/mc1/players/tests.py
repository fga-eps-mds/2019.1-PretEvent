from rest_framework.test import APITestCase
from rest_framework import status
from players.models import Player

def get_players(self, url):
    url = url
    response = self.client.get(url)
    return response

def post_players(self, url, data):
    url = url
    data = data
    response = self.client.post(url, data)
    return response

def put_players(self, url, data):
    url = url
    data = data
    response = self.client.put(url, data)
    return response

def delete_players(self, url, data):
    url = url
    data = data
    response = self.client.delete(url, data)
    return response

class PlayersTests(APITestCase):
    def test_create_player(self):
        """
        Ensure we can create a new player.
        """
        data = {
            'username': 'UserTest',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        response = post_players(self, '/api/players/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Player.objects.count(), 1)
        self.assertEqual(Player.objects.get().username, 'UserTest')

    def test_login_player(self):
        """
        Ensure we can login with a new player.
        """
        data = {
            'username': 'UserTest',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        post_players(self, '/api/players/', data)
        response = post_players(self, '/rest-auth/login/', { 'username': 'UserTest', 'password': 'q1w2e3'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_players(self):
        """
        Ensure we can get all players.
        """
        url = '/api/players/'
        for player in range(1, 5):
            data = {
                'username': 'UserTest%d' % (player),
                'password': 'q1w2e3',
                'university_id': '123%d' % (player),
                'points': '2',
                'photo_url': 'http://image'
            }
            post_players(self, url, data)
        response = get_players(self, url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for player in range(1, 5):
            self.assertContains(response, 'UserTest%d' % (player))

    def test_get_players_ranking(self):
        """
        Ensure we can get the ranking of players order by points.
        """
        for player in range(1, 5):
            data = {
                'username': 'UserTest%d' % (player),
                'password': 'q1w2e3',
                'university_id': '123%d' % (player),
                'points': '2',
                'photo_url': 'http://image'
            }
            post_players(self, '/api/players/', data)
        response = get_players(self, '/api/players/ranking')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_player_detail(self):
        """
        Ensure we can get the details of a player.
        """
        data = {
            'username': 'UserTest',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        post_players(self, '/api/players/', data)
        response = get_players(self, '/api/players/%d' % Player.objects.get().id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, Player.objects.get().username)

    def test_create_player_error(self):
        """
        Ensure error 400 when create player without user name.
        """
        data = {
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        response = post_players(self, '/api/players/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Player.objects.count(), 0)

    def test_get_player_detail_error(self):
        """
        Ensure error 400 when try to get player details.
        """
        data = {
            'username': 'UserTest',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        post_players(self, '/api/players/', data)
        response = get_players(self, '/api/players/1000')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_player(self):
        """
        Ensure we can update a new player.
        """
        data = {
            'username': 'UserTest',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        post_players(self, '/api/players/', data)
        data = {
            'username': 'UserTest2',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        response = put_players(self, '/api/players/%d' % Player.objects.get().id, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Player.objects.get().username, 'UserTest2')

    def test_update_player_error(self):
        """
        Ensure error 400 when try to update player.
        """
        data = {
            'username': 'UserTest',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        post_players(self, '/api/players/', data)
        data = {
            'username': 'UserTest2'
        }
        response = put_players(self, '/api/players/%d' % Player.objects.get().id, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_player(self):
        """
        Ensure we can delete a new player.
        """
        data = {
            'username': 'UserTest',
            'password': 'q1w2e3',
            'university_id': '123456',
            'points': '2',
            'photo_url': 'http://image'
        }
        post_players(self, '/api/players/', data)
        response = delete_players(self, '/api/players/%d' % Player.objects.get().id, data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Player.objects.count(), 0)
