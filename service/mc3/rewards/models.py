from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Reward(models.Model):
    title = models.CharField(max_length = 200)
    description = models.TextField()
    points = models.PositiveIntegerField(default = 1, validators=[MinValueValidator(1)])
    badge_url = models.CharField(max_length = 200)

# Create your models here.
