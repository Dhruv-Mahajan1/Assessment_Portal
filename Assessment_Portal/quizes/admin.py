from django.contrib import admin
from quizes.models import Quiz
# Register your models here.

class QuizAdmin(admin.ModelAdmin):
    list_display = ('quizId','name','dateCreated')

admin.site.register(Quiz, QuizAdmin)
