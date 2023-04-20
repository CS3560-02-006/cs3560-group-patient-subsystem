from rest_framework.response import Response
from django.db import connection

# Methods for appointments
# Fetches all appointments
def getAppointments(request):
    cursor = connection.cursor()
    cursor.execute('Select * from appointment')
    output =[]
    for row in cursor:
        lt = []
        for i, value in enumerate(row):
            if value != None:
                lt.append((cursor.description[i][0], value))
        else:
            lt = dict(lt)
            output.append(lt)
    return Response(output)

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