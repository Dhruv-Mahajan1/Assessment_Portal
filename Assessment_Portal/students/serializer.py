from rest_framework import serializers
from students.models import Student,studentuser

class studentDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=studentuser
        fields = ['studentrollno', 'name', 'branch']