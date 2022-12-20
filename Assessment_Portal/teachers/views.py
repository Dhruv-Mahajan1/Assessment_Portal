from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from  rest_framework.decorators import api_view
from teachers.models import teacheruser
from studentResponse.models import studentResponse,peerResponse
from studentResponse.hashing import hashIndexes
from quizes.serializers import questionSerializer,quizSerializer
# Create your views here.
class getStudents(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,quizId):

        try:
            teacher=teacheruser.objects.get(user=request.user)

        except teacheruser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            Students=studentResponse.objects.filter(quizId=quizId).values_list('studentRollNo', flat=True).distinct()    
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(Students)


class doStudentMapping(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, quizId):
        try:
            teacher=teacheruser.objects.get(user=request.user)
        except teacheruser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            Students=studentResponse.objects.filter(quizId=quizId).values_list('studentRollNo', flat=True).distinct()    
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

            
        StudentMapping=hashIndexes(list(Students))
        for checkByStudentId,student in StudentMapping.items():
            questions=peerResponse.objects.filter(studentRollNo=student , quizId=quizId)
            questions.update(checkedByStudentId=checkByStudentId)
            
        return Response(StudentMapping)

class addQuiz(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        
        try:
            teacher=teacheruser.objects.get(user=request.user)
        except teacheruser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        print("hoii")
        serializer=quizSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)


class addQuestion(APIView):
    
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        
        try:
            teacher=teacheruser.objects.get(user=request.user)
        except teacheruser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer=questionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

