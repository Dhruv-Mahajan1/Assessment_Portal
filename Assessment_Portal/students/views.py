from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from students.models import Student
from studentResponse.models import studentResponse
from studentResponse.models import peerResponse
from quizes.models import Question
from studentResponse.models import studentResponse,peerResponse

from studentResponse.serializer import peerResponseSerializer,studentResponseSerializer
from students.serializer import studentDetailsSerializer
from studentResponse.serializer import peerResponseSerializer
from studentResponse.serializer import studentResponseSerializer
from quizes.serializers import questionSerializer

from students.models import studentuser
from user.models import User
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
            print(attemptedQuestions)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        return Response(serializer.data)

class getpartQuizScore(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            student=studentuser.objects.get(user=request.user)
            attemptedQuestions=studentResponse.objects.filter(studentRollNo=student.studentrollno)
            print(attemptedQuestions)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        return Response(serializer.data)

class getPeerResponse(APIView):
    
    def put(self, request, quizId):
        newData = request.data
        # request.data['studentRollNo'] = "B20CS083"
        print(newData)
        try:
            peerRes = peerResponse.objects.filter(checkedByStudentId = newData['studentRollNo'], quizId = quizId)
            print(peerRes)
        except peerResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = peerResponseSerializer(peerRes,many=True)
        return Response(serializer.data)




class putSelfResponse(APIView):
    permission_classes = (AllowAny,)

    def put(self, request, quizId):
        newData = request.data
        questionId = request.data['questionId']
        # request.data['studentRollNo'] = "B20CSE090"
        try:
           # print(request.user)
            print(newData)
            # print(request.COOKIES['rollnumber'])
            student=studentuser.objects.get(studentrollno = newData['studentRollNo'])
           # print(student.studentrollno)
            studRes=studentResponse.objects.filter(studentRollNo=student.studentrollno , quizId=quizId, questionId=questionId)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(studRes[0], data=newData)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class putPeerResponse(APIView):
    permission_classes = (AllowAny,)
    def put(self, request, quizId):
        newData = request.data
        print(newData)
        questionId = request.data['questionId']
        try:
            student=studentuser.objects.get(studentrollno = newData['checkedByStudentId'])
            studRes=peerResponse.objects.filter(checkedByStudentId=student.studentrollno , quizId=quizId, questionId=questionId)

        except peerResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = peerResponseSerializer(studRes[0], data=newData)
        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class addstudent(APIView):
    # permission_classes = (IsAuthenticated,)
    def post(self, request):
        newData = request.data
        try:
            user=User.objects.get(username=newData['user'])
            student=studentuser.objects.get(user=user)
            del newData['user']
            return Response({'message':"Alreay user exists"})
        except studentuser.DoesNotExist:
            
            serializer = studentDetailsSerializer(data=newData)
            if serializer.is_valid():
                new_student = studentuser.objects.create(
                user=user,
                studentrollno=newData['studentrollno'],
                branch=newData['branch'],
                name=newData['name']
            )
                new_student.save()
                return Response(serializer.data)
            print(newData)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getResponse(APIView):
    
    def put(self, request, quizId):
        newData = request.data
        # request.data['studentRollNo'] = "B20CS083"
        print(newData)

        peerRes = peerResponse.objects.filter(studentRollNo = newData['studentRollNo'], quizId = quizId)
        selfRes = studentResponse.objects.filter(studentRollNo = newData['studentRollNo'], quizId = quizId)

        serializer1 = peerResponseSerializer(peerRes,many=True)
        serializer2 = studentResponseSerializer(selfRes,many=True)

        for i in range(len(serializer1.data)):
            for j in range(len(serializer2.data)):
                if(serializer2.data[j]["questionId"] == serializer1.data[i]["questionId"]):
                    serializer2.data[j]["peerScore"] = serializer1.data[i]["peerScore"]

        return Response(serializer2.data)