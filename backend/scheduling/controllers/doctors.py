from rest_framework.response import Response
from django.db import connection


# fetches all doctors in database
def getDoctors(request):
    cursor = connection.cursor()
    cursor.execute('Select * from doctor')
    output = []
    for row in cursor:
        lt = []
        for i, value in enumerate(row):
            if value != None:
                lt.append((cursor.description[i][0], value))
        else:
            lt = dict(lt)
            output.append(lt)
    return Response(output)