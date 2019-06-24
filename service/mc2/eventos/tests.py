from rest_framework.test import APITestCase
from rest_framework import status
from eventos.models import Evento

def get_eventos(self, url):
    url = url
    response = self.client.get(url)
    return response

def post_eventos(self, url, data):
    url = url
    data = data
    response = self.client.post(url, data)
    return response

def put_eventos(self, url, data):
    url = url
    data = data
    response = self.client.put(url, data)
    return response

def delete_eventos(self, url, data):
    url = url
    data = data
    response = self.client.delete(url, data)
    return response

class EventosTests(APITestCase):
    def test_create_evento(self):
        """
        Ensure we can create a new evento.
        """
        data = {
            'title': 'Evento Teste',
            'date': '2019-06-27 13:10:00+00',
            'place': 'FGA',
            'points': '2',
            'description': 'Descricao do evento teste',
            'url_image': 'http://image',
            'reward_id': '1',
            'creator_id': '1'
        }
        response = post_eventos(self, '/api/eventos/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Evento.objects.count(), 1)
        self.assertEqual(Evento.objects.get().title, 'Evento Teste')

    def test_get_eventos(self):
        """
        Ensure we can get all eventos.
        """
        url = '/api/eventos/'
        for evento in range(1, 5):
            data = {
                'title': 'Evento Teste %d' % (evento),
                'date': '2019-06-27 13:10:00+00',
                'place': 'FGA',
                'points': '2',
                'description': 'Descricao do evento teste',
                'url_image': 'http://image',
                'reward_id': '1',
                'creator_id': '1'
            }
            post_eventos(self, url, data)
        response = get_eventos(self, url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for evento in range(1, 5):
            self.assertContains(response, 'Evento Teste %d' % (evento))

    def test_create_evento_error(self):
        """
        Ensure error 400 when create event without data.
        """
        data = {
            'title': '',
            'date': '',
            'place': '',
            'points': '',
            'description': '',
            'url_image': '',
            'reward_id': '',
            'creator_id': ''
        }
        response = post_eventos(self, '/api/eventos/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Evento.objects.count(), 0)

    def test_get_evento_detail(self):
        """
        Ensure we can get the details of a evento.
        """
        data = {
            'title': 'Evento Teste',
            'date': '2019-06-27 13:10:00+00',
            'place': 'FGA',
            'points': '2',
            'description': 'Descricao do evento teste',
            'url_image': 'http://image',
            'reward_id': '1',
            'creator_id': '1'
        }
        post_eventos(self, '/api/eventos/', data)
        response = get_eventos(self, '/api/eventos/%d' % Evento.objects.get().id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, Evento.objects.get().title)

    def test_get_evento_detail_error(self):
        """
        Ensure error 400 when try to get evento details.
        """
        data = {
            'title': 'Evento Teste',
            'date': '2019-06-27 13:10:00+00',
            'place': 'FGA',
            'points': '2',
            'description': 'Descricao do evento teste',
            'url_image': 'http://image',
            'reward_id': '1',
            'creator_id': '1'
        }
        post_eventos(self, '/api/eventos/', data)
        response = get_eventos(self, '/api/eventos/1000')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_evento(self):
        """
        Ensure we can update a new evento.
        """
        data = {
            'title': 'Evento Teste',
            'date': '2019-06-27 13:10:00+00',
            'place': 'FGA',
            'points': '2',
            'description': 'Descricao do evento teste',
            'url_image': 'http://image',
            'reward_id': '1',
            'creator_id': '1'
        }
        post_eventos(self, '/api/eventos/', data)
        data = {
            'title': 'Evento Teste 2',
            'date': '2019-06-27 13:10:00+00',
            'place': 'FGA',
            'points': '2',
            'description': 'Descricao do evento teste 2',
            'url_image': 'http://image',
            'reward_id': '1',
            'creator_id': '1'
        }
        response = put_eventos(self, '/api/eventos/%d' % Evento.objects.get().id, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Evento.objects.get().title, 'Evento Teste 2')

    def test_update_evento_error(self):
        """
        Ensure error 400 when try to update evento.
        """
        data = {
            'title': 'Evento Teste',
            'date': '2019-06-27 13:10:00+00',
            'place': 'FGA',
            'points': '2',
            'description': 'Descricao do evento teste',
            'url_image': 'http://image',
            'reward_id': '1',
            'creator_id': '1'
        }
        post_eventos(self, '/api/eventos/', data)
        data = {
            'title': 'Evento Teste 2',
        }
        response = put_eventos(self, '/api/eventos/%d' % Evento.objects.get().id, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_evento(self):
        """
        Ensure we can delete a new evento.
        """
        data = {
            'title': 'Evento Teste',
            'date': '2019-06-27 13:10:00+00',
            'place': 'FGA',
            'points': '2',
            'description': 'Descricao do evento teste',
            'url_image': 'http://image',
            'reward_id': '1',
            'creator_id': '1'
        }
        post_eventos(self, '/api/eventos/', data)
        response = delete_eventos(self, '/api/eventos/%d' % Evento.objects.get().id, data)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Evento.objects.count(), 0)
