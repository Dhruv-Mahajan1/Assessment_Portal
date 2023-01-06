from rest_framework.response import Response
from rest_framework import status
from  rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from quizes.models import Quiz
from quizes.models import Question
from quizes.models import CorrectAnswer
from quizes.serializers import quizSerializer,questionSerializer, correctAnswerSerializer

# for quiz 
@api_view(['GET'])
def getQuiz(request):
    quizzes=Quiz.objects.all()
    serializer=quizSerializer(quizzes,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getparticularQuiz(request,quizId):
    quizzes=Quiz.objects.get(quizId=quizId)
    serializer=quizSerializer(quizzes)
    return Response(serializer.data)


class domappquiz(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, quizId):
        try:
            quiz=Quiz.objects.get(quizId=quizId)
        except Quiz.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        quiz.mapped=True
        quiz.save()
        return Response(quizSerializer(quiz).data)


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


@api_view(['POST'])
def postCorrectAnswer(request,quizId, questionId):

    newData = request.data
    quiz = Quiz.objects.get(quizId=quizId)
    question = Question.objects.get(questionId=questionId, quizId=quizId)
    try:
        correctAns = CorrectAnswer.objects.get(questionId=questionId, quizId=quizId)
    except CorrectAnswer.DoesNotExist:

        correctAns = CorrectAnswer.objects.create(questionId=question, quizId=quiz, correctAnswer=newData["ca"])
        correctAns.save()

        return Response("donE")
