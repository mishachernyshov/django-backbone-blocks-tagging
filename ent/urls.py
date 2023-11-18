from django.urls import path
from rest_framework.routers import DefaultRouter

from ent.views import BlockTagsView, BlockViewSet, TagViewSet, index

router = DefaultRouter()
router.register('block', BlockViewSet, basename='block')
router.register('tag', TagViewSet, basename='tag')

urlpatterns = [
    path('', index),
    path('block/<int:block_id>/tags/', BlockTagsView.as_view()),
] + router.urls
