from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from students.models import Student
from studentResponse.models import studentResponse
from quizes.models import Question
from studentResponse.models import studentResponse,peerResponse

from studentResponse.serializer import peerResponseSerializer,studentResponseSerializer
from students.serializer import studentDetailsSerializer
from quizes.serializers import questionSerializer

from students.models import studentuser
# Create your views here.


class StudentDetails(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            student=studentuser.objects.get(user=request.user)
        except studentuser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentDetailsSerializer(student)
        print(serializer.data)
        return Response(serializer.data)
        

class GetCumulativeScore(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            student=studentuser.objects.get(user=request.user)
            attemptedQuestions=studentResponse.objects.filter(studentRollNo=student.studentrollno)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        score=0
        for i in range(len(serializer.data)):
            score+=serializer.data[i]['selfScore']
        return Response(score)



class getQuizScore(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, quizId):
        try:
            student=studentuser.objects.get(user=request.user)
            attemptedQuestions=studentResponse.objects.filter(studentRollNo=student.studentrollno , quizId=quizId)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        return Response(serializer.data)




class putSelfResponse(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request, quizId):
        newData = request.data
        try:
            student=studentuser.objects.get(user=request.user)
            studRes=studentResponse.objects.filter(studentRollNo=student.studentrollno , quizId=quizId)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(studRes[0], data=newData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class putPeerResponse(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request, quizId):
        newData = request.data
        try:
            student=studentuser.objects.get(user=request.user)
            studRes=peerResponse.objects.filter(studentRollNo=student.studentrollno , quizId=quizId)

        except peerResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = peerResponseSerializer(studRes[0], data=newData)
        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


