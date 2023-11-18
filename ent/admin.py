from django.contrib import admin

from ent.models import Block, Tag


admin.site.register((
    Block,
    Tag,
))
