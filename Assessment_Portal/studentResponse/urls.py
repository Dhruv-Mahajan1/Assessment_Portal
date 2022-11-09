from django.urls import path
from . import views

urlpatterns = [
    path('putSelfResponse/<int:quizId>/<str:studentId>/',views.putSelfResponse.as_view(),name="put-self-data"),
    path('putPeerResponse/<int:quizId>/<str:studentId>/',views.putPeerResponse.as_view(),name="put-peer-data"),
    path('doStudentMapping/<int:quizId>/',views.doStudentMapping.as_view(),name="Do-Student-Mapping"),
]