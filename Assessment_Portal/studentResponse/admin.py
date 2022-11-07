from django.contrib import admin
from studentResponse.models import studentResponse
from studentResponse.models import peerResponse
from import_export.admin import ImportExportModelAdmin
# Register your models here.

class studentResponseAdmin(ImportExportModelAdmin):
    list_display = ('studentRollNo','quizId','questionId','response','selfScore')
class peerResponseAdmin(ImportExportModelAdmin):
    list_display = ('studentRollNo','checkedByStudentId','quizId','questionId','response','peerScore')

admin.site.register(studentResponse, studentResponseAdmin)
admin.site.register(peerResponse, peerResponseAdmin)
 