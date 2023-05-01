from rest_framework.response import Response
from django.db import connection


# fetches all doctors in database
def getDoctors(request, doctor_id=None):
    """
    Get all doctors or a single doctor by ID along with their associated appointments
    """
    with connection.cursor() as cursor:
        if doctor_id:
            cursor.execute("""
                SELECT Doctor.*, Appointment.*
                FROM Doctor
                LEFT JOIN Appointment ON Doctor.doctorID = Appointment.doctorID
                WHERE Doctor.doctorID = %s
            """, [doctor_id])
        else:
            cursor.execute("""
                SELECT Doctor.*, Appointment.*
                FROM Doctor
                LEFT JOIN Appointment ON Doctor.doctorID = Appointment.doctorID
            """)

        result = [dict(zip([column[0] for column in cursor.description], row))
                  for row in cursor.fetchall()]

    # Map the result to match the frontend interface
    doctors = {}
    for row in result:
        doctorID = row['doctorID']
        if doctorID not in doctors:
            doctors[doctorID] = {
                'doctorID': doctorID,
                'name': row['name'],
                'dateofBirth': row['dateofBirth'].strftime('%Y-%m-%d'),
                'specialty': row['specialty'],
                'appointments': [],
            }

        if row['appointmentID'] is not None:
            appointment = {
                'appointmentID': row['appointmentID'],
                'doctorID': doctorID,
                'patientID': row['patientID'],
                'date': row['date'].strftime('%Y-%m-%d'),
                'startTime': row['startTime'].strftime('%H:%M:%S'),
                'endTime': row['endTime'].strftime('%H:%M:%S'),
                'status': row['status'],
            }

            doctors[doctorID]['appointments'].append(appointment)

    formatted_doctors = list(doctors.values())

    return Response(formatted_doctors)
