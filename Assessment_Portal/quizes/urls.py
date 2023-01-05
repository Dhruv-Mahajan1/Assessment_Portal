
from django.urls import path, include
from . import views
urlpatterns = [
    path('getquiz/',views.getQuiz),
    path('getquestion/<int:questionId>/',views.getQuestion),
    path('getcorrectanswer/<int:questionId>/',views.getCorrectAnswer),
    path('getquizquestions/<int:quizId>/',views.getQuizQuestions),
    path('getparticularQuiz/<int:quizId>/',views.getparticularQuiz),
    path('dpmappquiz/<int:quizId>/',views.domappquiz.as_view(),name="domappquiz"),
    path('getcorrectanswer/<int:questionId>/',views.getCorrectAnswer),
]