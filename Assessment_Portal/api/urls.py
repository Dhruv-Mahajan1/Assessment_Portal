
from django.urls import path, include
urlpatterns = [
    path('api/quiz/', include("quizes.urls")),
    path('api/teacher/', include("teachers.urls")),
    path('api/student/', include("students.urls")),
    path('accounts/', include('allauth.urls')),
]