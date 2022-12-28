
from django.urls import path, include
from . import views
urlpatterns = [
    path('addquiz/',views.addQuiz.as_view(),name="addQuiz"),
    path('getteacherdetails/',views.getteacherdetails.as_view(),name="getteacherdetails"),
    path('addquestion/',views.addQuestion.as_view(),name="addQuestion"),
    path('doStudentMapping/<int:quizId>/',views.doStudentMapping.as_view(),name="Do-Student-Mapping"),
    path('getStudents/<int:quizId>/', views.getStudents.as_view(), name="student-list"),  
]