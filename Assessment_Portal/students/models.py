from django.db import models
from user.models import User



# Create your models here.
class Student(models.Model):
    studentRollNo=models.CharField(max_length=200,primary_key=True)
    name=models.CharField(max_length=200)
   


class studentuser(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    studentrollno=models.CharField(max_length=200,primary_key=True)
    name=models.CharField(max_length=200)
    branch=models.CharField(max_length=200)
    