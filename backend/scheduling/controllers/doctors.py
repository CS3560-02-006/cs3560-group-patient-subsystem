from rest_framework.response import Response
from rest_framework import status
from django.db import connection


# Fetches all doctors in the database or a single doctor by ID
def getDoctors(request, doctor_id=None):
    """
    Get all doctors or a single doctor by ID along with their associated appointments
    """
    try:
        # Connect to the database
        with connection.cursor() as cursor:
            # If doctor_id is provided, fetch the doctor with the given ID
            if doctor_id:
                cursor.execute("""
                    SELECT Doctor.*, Appointment.*
                    FROM Doctor
                    LEFT JOIN Appointment ON Doctor.doctorID = Appointment.doctorID
                    WHERE Doctor.doctorID = %s
                """, [doctor_id])
            # If doctor_id is not provided, fetch all doctors
            else:
                cursor.execute("""
                    SELECT Doctor.*, Appointment.*
                    FROM Doctor
                    LEFT JOIN Appointment ON Doctor.doctorID = Appointment.doctorID
                """)

            # Fetch the results and convert them to dictionaries
            result = [dict(zip([column[0] for column in cursor.description], row))
                      for row in cursor.fetchall()]

        # Map the result to match the frontend interface
        doctors = {}
        for row in result:
            doctorID = row['doctorID']
            # If the doctor is not in the doctors dictionary, add them
            if doctorID not in doctors:
                doctors[doctorID] = {
                    'doctorID': doctorID,
                    'name': row['name'],
                    'dateofBirth': row['dateofBirth'].strftime('%Y-%m-%d'),
                    'specialty': row['specialty'],
                    'appointments': [],
                }

            # If the appointmentID is not None, append the appointment to the doctor's appointments list
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

        # Format the doctors as a list
        formatted_doctors = list(doctors.values())

        # Return the formatted doctors with a 200 OK status
        return Response(formatted_doctors, status=status.HTTP_200_OK)

    except Exception as e:
        # If an error occurs, return a 500 Internal Server Error status along with the error message
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
