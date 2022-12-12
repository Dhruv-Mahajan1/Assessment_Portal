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

from .hashing import hashIndexes
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









