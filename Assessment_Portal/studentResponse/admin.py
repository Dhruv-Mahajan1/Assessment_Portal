from django.contrib import admin
from studentResponse.models import studentResponse
# Register your models here.

class studentResponseAdmin(admin.ModelAdmin):
    list_display = ('studentRollNo','quizId','questionId','response','selfScore')

admin.site.register(studentResponse, studentResponseAdmin)
