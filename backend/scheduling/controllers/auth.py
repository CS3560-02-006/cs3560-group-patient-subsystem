from rest_framework.response import Response

def createUser(request):

    return Response(request.data)

def updateUser(request):

    return Response(request.data)

def deleteUser(request):

    return Response(request.data)