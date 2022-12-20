from django.contrib import admin
from students.models import Student,studentuser
# Register your models here.
class StudentAdmin(admin.ModelAdmin):
    list_display = ('studentRollNo','name')

admin.site.register(Student, StudentAdmin)
admin.site.register(studentuser)