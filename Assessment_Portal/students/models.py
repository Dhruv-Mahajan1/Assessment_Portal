from django.db import models

# Create your models here.
class Student(models.Model):
    studentRollNo=models.CharField(max_length=200,primary_key=True)
    name=models.CharField(max_length=200)
   