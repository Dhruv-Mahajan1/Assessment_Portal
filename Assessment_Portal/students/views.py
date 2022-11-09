from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from students.models import Student
from studentResponse.models import studentResponse
from quizes.models import Question

from students.serializer import studentDetailsSerializer
from studentResponse.serializer import studentResponseSerializer
from api.serializers import questionSerializer

# Create your views here.


class StudentDetails(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request, studentId):
        try:
            studentDetails=Student.objects.filter(studentRollNo=studentId)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentDetailsSerializer(studentDetails,many=True)

        return Response(serializer.data)
    

class GetCumulativeScore(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, studentId):
        try:
            attemptedQuestions=studentResponse.objects.filter(studentRollNo=studentId)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        score=0
        for i in range(len(serializer.data)):
            score+=serializer.data[i]['selfScore']
        print(score)
        return Response(score)



class getQuizScore(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, quizId,studentId):
        try:
            attemptedQuestions=studentResponse.objects.filter(studentRollNo=studentId , quizId=quizId)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        return Response(serializer.data)




class getStudents(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,quizId):
        try:
            Students=studentResponse.objects.filter(quizId=quizId).values_list('studentRollNo', flat=True).distinct()    
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(Students)



