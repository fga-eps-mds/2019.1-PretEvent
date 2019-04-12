from django.db import models

from django.contrib.auth.models import User

class Player(models.Model):
    name = models.CharField(max_length=200)
    university_id = models.IntegerField()
    points = models.IntegerField()
    photo_url = models.CharField(max_length=200)