
from rest_framework import serializers
from studentResponse.models import studentResponse
from studentResponse.models import peerResponse

class studentResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model=studentResponse
        fields='__all__'

class peerResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model=peerResponse
        fields='__all__'
