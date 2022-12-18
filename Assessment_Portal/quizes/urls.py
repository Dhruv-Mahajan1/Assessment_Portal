
from django.urls import path, include
from . import views
urlpatterns = [
    path('getquiz/',views.getQuiz),
    path('getquestion/<int:questionId>/',views.getQuestion),
    path('getquizquestions/<int:quizId>/',views.getQuizQuestions),
]