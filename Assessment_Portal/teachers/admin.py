from django.contrib import admin
from teachers.models import teacheruser

# Register your models here.
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('user','name', 'Course')

admin.site.register(teacheruser, TeacherAdmin)
