from rest_framework.response import Response
from rest_framework import status
from  rest_framework.decorators import api_view
from quizes.models import Quiz
from quizes.models import Question
from .serializers import quizSerializer,questionSerializer

# for quiz 
@api_view(['GET'])
def getQuiz(request):
    quizzes=Quiz.objects.all()
    serializer=quizSerializer(quizzes,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addQuiz(request):
    serializer=quizSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['GET'])
def getQuizQuestions(request,quizId):
    try:
        requiredQuestions = Question.objects.all().filter(quizId=quizId)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = questionSerializer(requiredQuestions,many=True)
        return Response(serializer.data)



# for questions 
@api_view(['POST'])
def addQuestion(request):
    serializer=questionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def getQuestion(request,questionId):

    try:
        requiredQuestion = Question.objects.get(questionId=questionId)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = questionSerializer(requiredQuestion)
        return Response(serializer.data)
