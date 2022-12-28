from rest_framework import serializers
from .models import teacheruser

class teacherDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model=teacheruser
        fields = [ 'name', 'Course']