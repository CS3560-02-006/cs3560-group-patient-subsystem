from rest_framework.response import Response

# fetches all doctors in database
def getDoctors(request):
 
    return Response(request.data)