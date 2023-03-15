from rest_framework.response import Response

# Methods for appointments
# Fetches all appointments
def getAppointments(request):
    # Query DB
    # Return Appointments
    return Response(request.data)

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

# returns existing patients
def getPatients(request):
    # Query DB
    # Return patients
    return Response(request.data)

# creates new patient record
def createPatient(request):
    # take request data
    # create new db entry
    # return success
    return Response(request.data)

# updates patient records
def updatePatient(request):
    # find entry
    # update new data
    # return success
    return Response(request.data)

# removes patient from the system
def deletePatient(request):
    #find patient in database
    #delete element
    #return response
    return Response(request.data)

# fetches all doctors in database
def getDoctors(request):
    # Query DB
    # Return Appointments
    return Response(request.data)