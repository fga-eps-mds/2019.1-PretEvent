from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class Player(User):
    university_id = models.CharField(max_length=255)
    points = models.IntegerField()
    photo_url = models.CharField(max_length=255)
