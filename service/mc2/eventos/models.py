from django.db import models

class Evento(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    points = models.IntegerField()
    description = models.TextField()

# Create your models here.
