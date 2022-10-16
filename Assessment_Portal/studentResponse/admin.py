from django.contrib import admin
from studentResponse.models import studentResponse
from import_export.admin import ImportExportModelAdmin
# Register your models here.

class studentResponseAdmin(ImportExportModelAdmin):
    list_display = ('studentRollNo','quizId','questionId','response','selfScore')

admin.site.register(studentResponse, studentResponseAdmin)
