from rest_framework import serializers

from ent import models


class BlockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Block
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    name = serializers.RegexField(
        r'^[a-zA-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ—-]+$',
        max_length=255,
        error_messages={'invalid': 'The value can contain only alphabetic characters, spaces, hyphens and dashes.'},
    )

    class Meta:
        model = models.Tag
        fields = '__all__'
