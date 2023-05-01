from rest_framework.response import Response
from django.db import connection
from rest_framework import status


def getAppointments(request):
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT a.*, p.name as patient_name, d.name as doctor_name
            FROM Appointment a
            JOIN Patient p ON a.patientID = p.patientID
            JOIN Doctor d ON a.doctorID = d.doctorID
        """)
        result = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]

    formatted_appointments = []
    for row in result:
        appointment = {
            'appointmentID': row['appointmentID'],
            'doctorID': row['doctorID'],
            'doctorName': row['doctor_name'],
            'patientID': row['patientID'],
            'patientName': row['patient_name'],
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
def updateAppointment(request, appointment_id):
    patient_id = request.data.get('patientID')
    doctor_id = request.data.get('doctorID')
    date = request.data.get('date')
    start_time = request.data.get('startTime')
    end_time = request.data.get('endTime')
    status = request.data.get('status')

    update_fields = {}
    if patient_id is not None:
        update_fields['patientID'] = patient_id
    if doctor_id is not None:
        update_fields['doctorID'] = doctor_id
    if date:
        update_fields['date'] = date
    if start_time:
        update_fields['startTime'] = start_time
    if end_time:
        update_fields['endTime'] = end_time
    if status:
        update_fields['status'] = status

    with connection.cursor() as cursor:
        if update_fields:
            set_clause = ', '.join([f"{field}=%s" for field in update_fields.keys()])
            set_values = list(update_fields.values())
            set_values.append(appointment_id)
            cursor.execute(f"UPDATE appointmentsdb.Appointment SET {set_clause} WHERE appointmentID=%s", set_values)

    return Response(3)



# cancels existing appointment
def deleteAppointment(request):
    #find appointment in database
    #delete element
    #return response
    return Response(request.data)