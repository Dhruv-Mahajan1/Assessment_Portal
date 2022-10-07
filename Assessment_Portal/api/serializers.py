
from rest_framework import serializers
from  quizes.models import Quiz
from quizes.models import Question
class quizSerializer(serializers.ModelSerializer):
    class Meta:
        model=Quiz
        fields='__all__'

class questionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields='__all__'