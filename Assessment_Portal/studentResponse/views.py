from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view


from .resources import studentResponseResource
from .resources import peerResponseResource
from tablib import Dataset
from .models import studentResponse
from .models import peerResponse
from django.http import HttpResponse
from django.contrib import messages
from .serializer import studentResponseSerializer
from .serializer import peerResponseSerializer
from rest_framework.views import APIView

# Create your views here.
def export(request):
    studentResResource = studentResponseResource()
    dataset = studentResponseResource.export()
    response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename="response.xls"'
    return response

def simple_upload(request):
    if request.method == 'POST':
        studentResResource = studentResponseResource()
        dataset = Dataset()
        newData = request.FILES['myfile']

        importedData = dataset.load(newData.read(),format='xlsx')
        print(importedData)
        for data in importedData:
            print(data[1])
            value = studentResponse(data[0],data[1],data[2],data[3],data[4])
            value.save()       
        
        #result = person_resource.import_data(dataset, dry_run=True)  # Test the data import

        #if not result.has_errors():
        #    person_resource.import_data(dataset, dry_run=False)  # Actually import now 

    return render(request, 'input.html')

class putSelfResponse(APIView):
    
    def put(self, request, quizId,studentId):
        newData = request.data
        try:
            studRes=studentResponse.objects.filter(studentRollNo=studentId , quizId=quizId)

        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(studRes[0], data=newData)
        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class putPeerResponse(APIView):
    
    def put(self, request, quizId,studentId):
        newData = request.data
        try:
            studRes=peerResponse.objects.filter(studentRollNo=studentId , quizId=quizId)

        except peerResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = peerResponseSerializer(studRes[0], data=newData)
        if serializer.is_valid():
             serializer.save()
             return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


