from pyexpat import model
from django.db import models

# Create your models here.
class Quiz(models.Model):
    quizId=models.AutoField(primary_key=True)
    name=models.CharField(max_length=200)
    dateCreated=models.DateField(auto_now_add=True)
   