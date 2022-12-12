from django.db import models
from user.models import User
# Create your models here.
class teacheruser(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=200)
    Course=models.CharField(max_length=200)