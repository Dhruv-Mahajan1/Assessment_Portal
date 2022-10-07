
from django.urls import path
from . import views
urlpatterns = [
    path('getquiz/',views.getQuiz),
    path('addquiz/',views.addQuiz),
    path('addquestion/',views.addQuestion),
    path('getquestion/<int:questionId>/',views.getQuestion),
    path('getquizquestions/<int:quizId>/',views.getQuizQuestions),
   
]