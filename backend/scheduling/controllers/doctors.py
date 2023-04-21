from rest_framework.response import Response
from django.db import connection


# fetches all doctors in database
def getDoctors(request):
    cursor = connection.cursor()
    cursor.execute('Select * from Doctor')
    output = []
    for row in cursor:
        lt = []
        for i, value in enumerate(row):
            if value != None:
                lt.append((cursor.description[i][0], value))
        else:
            lt = dict(lt)
            print(lt['doctorID'])
            curs = connection.cursor()
            curs.execute('select * from Appointment where doctorID = {id}'.format(id=lt['doctorID']))
            appointments = []
            for row in curs:
                appointment = []
                for i, value in enumerate(row):
                    if value != None:
                        appointment.append((curs.description[i][0], value))
                else:
                    appointment = dict(appointment)
                    appointments.append(appointment)
            lt['appointments'] = appointments
            output.append(lt)
    return Response(output)