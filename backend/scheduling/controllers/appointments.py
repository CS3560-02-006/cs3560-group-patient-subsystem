from rest_framework.response import Response
from django.db import connection

# Methods for appointments
# Fetches all appointments
def getAppointments(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM Appointment")
        result = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]

    # Map the result to match the frontend interface
    formatted_appointments = []
    for row in result:
        appointment = {
            'appointmentID': row['appointmentID'],
            'doctorID': row['doctorID'],
            'patientID': row['patientID'],
            'date': row['date'].strftime('%Y-%m-%d'),
            'startTime': row['startTime'].strftime('%H:%M:%S'),
            'endTime': row['endTime'].strftime('%H:%M:%S'),
            'status': row['status'],
        }
        formatted_appointments.append(appointment)

    return Response(formatted_appointments)

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