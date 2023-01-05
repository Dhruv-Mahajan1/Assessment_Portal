
from rest_framework import serializers
from  quizes.models import Quiz
from quizes.models import Question
from quizes.models import CorrectAnswer

class quizSerializer(serializers.ModelSerializer):
    class Meta:
        model=Quiz
        fields='__all__'

class questionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields='__all__'

class correctAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model=CorrectAnswer
        fields='__all__'
        
