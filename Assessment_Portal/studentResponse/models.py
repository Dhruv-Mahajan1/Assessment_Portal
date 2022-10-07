from django.db import models

from quizes.models import Quiz

# Create your models here.
class studentResponse(models.Model):
    studentRollNo=models.CharField(max_length=200)
    quizId=models.ForeignKey(Quiz, verbose_name="Category", on_delete=models.CASCADE)
    questionId=models.IntegerField()
    response=models.CharField(max_length=1200)
    selfScore=models.FloatField()

    class Meta:
        unique_together = ('studentRollNo', 'questionId',)