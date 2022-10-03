from rest_framework.response import Response
from  rest_framework.decorators import api_view
from quizes.models import Quiz
from .serializers import QuizSerializer
@api_view(['GET'])
def getQuiz(request):
    quizzes=Quiz.objects.all()
    serializer=QuizSerializer(quizzes,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addQuiz(request):
    serializer=QuizSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)