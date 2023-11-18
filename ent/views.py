from django.conf import settings
from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from ent import models, serializers


class BlockViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = models.Block.objects.all()
    serializer_class = serializers.BlockSerializer


class TagViewSet(ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer


class BlockTagsView(ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = serializers.TagSerializer

    def get_queryset(self):
        return models.Tag.objects.filter(blocks__in=(self.kwargs.get('block_id'),))

    def post(self, request, block_id):
        block = models.Block.objects.get(id=block_id)
        block.tags.set(request.data['tag_ids'])
        return Response()


class BlockUntagView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, block_id):
        block = models.Block.objects.get(id=block_id)
        block.tags.remove(request.data['tag'])
        return Response()


def index(request):
    return render(
        request,
        'index.html',
        {'stat_url': settings.STATIC_URL},
    )
