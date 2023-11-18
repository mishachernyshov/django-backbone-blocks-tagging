from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=32)
    color = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Block(models.Model):
    name = models.CharField(max_length=32)
    tags = models.ManyToManyField(Tag, related_name='blocks')

    def __str__(self):
        return self.name
