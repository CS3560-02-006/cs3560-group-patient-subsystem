from rest_framework.response import Response
from scheduling.models import Doctor
from scheduling.serializers import DoctorSerializer


# fetches all doctors in database
def getDoctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many =True)
 
    return Response(serializer.data)