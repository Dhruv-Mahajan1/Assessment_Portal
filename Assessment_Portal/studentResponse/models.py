from email.policy import default
from django.db import models

from quizes.models import Quiz
from quizes.models import Question
from students.models import studentuser
# Create your models here.
class studentResponse(models.Model):
    studentRollNo=models.ForeignKey(studentuser, verbose_name="studentRollNumber", on_delete=models.CASCADE)
    quizId=models.ForeignKey(Quiz, verbose_name="Quiz", on_delete=models.CASCADE)
    questionId=models.ForeignKey(Question, verbose_name="Question", on_delete=models.CASCADE)
    response=models.CharField(max_length=1200)
    selfScore=models.FloatField()

    class Meta:
        unique_together = ('studentRollNo', 'questionId',)

class peerResponse(models.Model):
    studentRollNo=models.ForeignKey(studentuser, verbose_name="studentRollNumber", on_delete=models.CASCADE)
    checkedByStudentId = models.CharField(studentuser, max_length=20)
    quizId=models.ForeignKey(Quiz, verbose_name="Category", on_delete=models.CASCADE)
    questionId=models.ForeignKey(Question, verbose_name="Category", on_delete=models.CASCADE)
    response=models.CharField(max_length=1200)
    peerScore=models.FloatField()

    class Meta:
        unique_together = ('studentRollNo', 'questionId',)