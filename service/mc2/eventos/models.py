from django.db import models

class Evento(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    points = models.IntegerField()
    description = models.TextField()
    url_image = models.CharField(max_length=255)
    reward_id = models.CharField(max_length=255)