from rest_framework.response import Response

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