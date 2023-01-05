from django.contrib import admin
from quizes.models import Quiz
from quizes.models import Question
from quizes.models import CorrectAnswer
# Register your models here.

class QuizAdmin(admin.ModelAdmin):
    list_display = ('quizId','name','dateCreated')
class QuestionAdmin(admin.ModelAdmin):
    list_display = ( 'quizId' ,'questionId','name', 'description'
    ,'totalMarks' ,'type')
class CorrectAnswerAdmin(admin.ModelAdmin):
    list_display = ('quizId', 'questionId', 'correctAnswer')

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(CorrectAnswer, CorrectAnswerAdmin)