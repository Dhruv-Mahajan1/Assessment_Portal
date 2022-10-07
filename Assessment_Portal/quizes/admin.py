from django.contrib import admin
from quizes.models import Quiz
from quizes.models import Question
# Register your models here.

class QuizAdmin(admin.ModelAdmin):
    list_display = ('quizId','name','dateCreated')
class QuestionAdmin(admin.ModelAdmin):
    list_display = ( 'quizId' ,'questionId','name', 'description'
    ,'totalMarks' ,'type')

admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)