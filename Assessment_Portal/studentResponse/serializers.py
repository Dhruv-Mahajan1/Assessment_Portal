
from rest_framework import serializers
from studentResponse.models import studentResponse

class studentResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model=studentResponse
        fields='__all__'

