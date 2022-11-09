from django.shortcuts import render

# Create your views here.


class StudentDetails(APIView):
    # permission_classes = (IsAuthenticated,)
    def get(self, request, studentId):
        try:
            studentDetails=Student.objects.filter(studentRollNo=studentId)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentDetailsSerializer(studentDetails,many=True)

        return Response(serializer.data)
    

class GetCumulativeScore(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, studentId):
        try:
            attemptedQuestions=studentResponse.objects.filter(studentRollNo=studentId)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        score=0
        for i in range(len(serializer.data)):
            score+=serializer.data[i]['selfScore']
        print(score)
        return Response(score)



class getQuizScore(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, quizId,studentId):
        try:
            attemptedQuestions=studentResponse.objects.filter(studentRollNo=studentId , quizId=quizId)
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = studentResponseSerializer(attemptedQuestions,many=True)
        return Response(serializer.data)



class getStudents(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,quizId):
        try:
            Students=studentResponse.objects.filter(quizId=quizId).values_list('studentRollNo', flat=True).distinct()    
        except studentResponse.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(Students)


