from rest_framework.response import Response
from rest_framework import status
from  rest_framework.decorators import api_view
from quizes.models import Quiz
from quizes.models import Question,CorrectAnswer
from quizes.serializers import quizSerializer,questionSerializer,correctAnswerSerializer
# for quiz 
@api_view(['GET'])
def getQuiz(request):
    quizzes=Quiz.objects.all()
    serializer=quizSerializer(quizzes,many=True)
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




@api_view(['GET'])
def getQuestion(request,questionId):

    try:
        requiredQuestion = Question.objects.get(questionId=questionId)
    except Question.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = questionSerializer(requiredQuestion)
        return Response(serializer.data)

@api_view(['GET'])
def getCorrectAnswer(request,questionId):

    try:
        correctAns = CorrectAnswer.objects.get(questionId=questionId)
    except CorrectAnswer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = correctAnswerSerializer(correctAns)
        return Response(serializer.data)