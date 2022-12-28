from rest_framework import serializers
from .models import teacheruser
from students.models import studentuser

class teacherDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=teacheruser
        fields = [ 'name', 'Course']

class studentlistserializer(serializers.ModelSerializer):
    class Meta:
        model=studentuser
        fields='__all__'
        