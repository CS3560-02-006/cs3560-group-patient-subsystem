from rest_framework.response import Response
from scheduling.models import Appointment
from scheduling.serializers import AppointmentSerializer

# Methods for appointments
# Fetches all appointments
def getAppointments(request):
    appointments = Appointment.objects.all()
    serializer = AppointmentSerializer(appointments, many =True)
    return Response(serializer.data)

# Creates new appointment
def createAppointment(request):
    # take request data
    # create new db entry
    # return success 
    return Response(request.data)

# updates appointment attributes
def updateAppointment(request):
    # find entry
    # update new data
    # return success
    return Response(request.data)

# cancels existing appointment
def deleteAppointment(request):
    #find appointment in database
    #delete element
    #return response
    return Response(request.data)