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
from .serializer import teacherDetailsSerializer,studentlistserializer
from students.models import studentuser
from students.serializer import studentDetailsSerializer
# Create your views here.
class getStudents(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,quizId):

        try:
            teacher=teacheruser.objects.get(user=request.user)

        except teacheruser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            Studentsresonse=studentResponse.objects.filter(quizId=quizId).values_list('studentRollNo', flat=True)
            Students_rollno_list=Studentsresonse.distinct()
            Students_user_list = studentuser.objects.filter(studentrollno__in=Students_rollno_list)
            serializer = studentlistserializer(Students_user_list ,many=True)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
       
      
        return Response(serializer.data)
        


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

class getteacherdetails(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            teacher=teacheruser.objects.get(user=request.user)
        except teacheruser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = teacherDetailsSerializer(teacher)
        return Response(serializer.data)