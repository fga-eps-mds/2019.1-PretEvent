from rest_framework.test import APITestCase
from rest_framework import status
from rewards.models import Reward

def get_rewards(self, url):
    url = url
    response = self.client.get(url)
    return response

def post_rewards(self, url, data):
    url = url
    data = data
    response = self.client.post(url, data)
    return response

class RewardsTests(APITestCase):
    def test_create_reward(self):
        """
        Ensure we can create a new reward.
        """
        data = {
            'title': 'Reward Test',
            'description': 'Descricao Reward Test',
            'points': '2',
            'badge_url': 'http://image'
        }
        response = post_rewards(self, '/api/rewards/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Reward.objects.count(), 1)
        self.assertEqual(Reward.objects.get().title, 'Reward Test')

    def test_get_rewards(self):
        """
        Ensure we can get all rewards.
        """
        url = '/api/rewards/'
        for reward in range(1, 5):
            data = {
                'title': 'Reward Test %d' % (reward),
                'description': 'Descricao Reward Test',
                'points': '2',
                'badge_url': 'http://image'
            }
            post_rewards(self, url, data)
        response = get_rewards(self, url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for reward in range(1, 5):
            self.assertContains(response, 'Reward Test %d' % (reward))

    def test_create_reward_error(self):
        """
        Ensure error 400 when create reward without data.
        """
        data = {
            'title': '',
            'description': '',
            'points': '',
            'badge_url': ''
        }
        response = post_rewards(self, '/api/rewards/', data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Reward.objects.count(), 0)

    def test_get_reward_detail(self):
        """
        Ensure we can get the details of a reward.
        """
        data = {
            'title': 'Reward Test',
            'description': 'Descricao Reward Test',
            'points': '2',
            'badge_url': 'http://image'
        }
        post_rewards(self, '/api/rewards/', data)
        response = get_rewards(self, '/api/rewards/%d' % Reward.objects.get().id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, Reward.objects.get().title)
