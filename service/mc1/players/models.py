# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.validators import MinLengthValidator
from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    id = models.IntegerField()
    name = models.CharField(max_length=200)
    university_id = models.IntegerField()
    points = models.IntegerField()
    photo_url = models.CharField()
