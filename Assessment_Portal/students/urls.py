from django.urls import path
from . import views

urlpatterns = [
    path('getCumulativeScore/<str:studentId>/',views.GetCumulativeScore.as_view(),name="get-cumulative-score"),
    path('studentDetails/<str:studentId>/', views.StudentDetails.as_view(), name="student-details"), 
    path('getQuizScore/<int:quizId>/<str:studentId>/', views.getQuizScore.as_view(), name="student-details"),
    path('getStudents/<int:quizId>/', views.getStudents.as_view(), name="student-list"),   
    # path('doSelfAssessment/<int:quizId>/<str:studentId>/', views.doSelfAssessment.as_view(), name="student-details"),   

]