
from django.urls import path, include
from . import views
urlpatterns = [
    path('getquiz/',views.getQuiz),
    path('addquiz/',views.addQuiz),
    path('addquestion/',views.addQuestion),
    path('getquestion/<int:questionId>/',views.getQuestion),
    path('getquizquestions/<int:quizId>/',views.getQuizQuestions),
    path('api/student/', include("students.urls")),
]