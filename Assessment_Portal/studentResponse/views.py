from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


from .resources import studentResponseResource
from .resources import peerResponseResource
from tablib import Dataset
from quizes.models import Quiz, Question
from students.models import studentuser
from quizes.models import Quiz, Question
from students.models import studentuser
from .models import studentResponse
from .models import peerResponse
from django.http import HttpResponse
from django.contrib import messages
from .serializer import studentResponseSerializer
from .serializer import peerResponseSerializer
from rest_framework.views import APIView

from .hashing import hashIndexes
# Create your views here.
def export(request):
    studentResResource = studentResponseResource()
    dataset = studentResponseResource.export()
    response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename="response.xls"'
    return response
 
 
def simple_upload(request,quizId):

    if request.method == 'POST':
        studentResResource = studentResponseResource()
        dataset = Dataset()
        newData = request.FILES['myfile']
        importedData = dataset.load(newData.read(),format='xlsx')
        numberOfQuestions = len(importedData[0]) - 1
        print(numberOfQuestions)
        
        baseId = Question.objects.order_by('-questionId')[0].questionId

        for data in importedData:
            if(data[0] == None): 
                break
            for i in range(numberOfQuestions):
                rollNumber = data[0]
                student    = studentuser.objects.get(studentrollno = rollNumber)
                quiz       = Quiz.objects.get(quizId = quizId)
                question   = Question.objects.get(quizId = quizId, questionId = baseId-numberOfQuestions+ i + 1)
                response   = data[i+1]
                selfScore  = 0
                value_self = studentResponse(studentRollNo=student, quizId=quiz, questionId=question, response=response, selfScore=selfScore)
                value_self.save() 
                value_peer = peerResponse(studentRollNo=student, checkedByStudentId="null",quizId=quiz, questionId=question, response=response, peerScore=selfScore)
                value_peer.save() 
        
        #result = person_resource.import_data(dataset, dry_run=True)  # Test the data import

        #if not result.has_errors():
        #    person_resource.import_data(dataset, dry_run=False)  # Actually import now 

    return render(request, 'input.html')









