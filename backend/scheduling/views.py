from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from scheduling.controllers.appointments import getAppointments, createAppointment, updateAppointment, deleteAppointment
from scheduling.controllers.patients import getPatients, createPatient, updatePatient, deletePatient
from scheduling.controllers.doctors import  getDoctors
from scheduling.controllers.auth import getUser, createUser, updateUser, deleteUser, loginUser, getUser
from .authentication import api_authentication


@api_view(['POST'])
def loginHandler(request): 
    return loginUser(request)


# Routes to appropriate controls for appointments depending on http method
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
# @api_authentication
def appointmentHandler(request):
    if request.method == 'GET':
        return getAppointments(request)
    if request.method == 'POST':
        return createAppointment(request)
    if request.method == 'PATCH':
        return updateAppointment(request)
    if request.method == 'DELETE':
        return deleteAppointment(request)

# Routes to appropriate controls for doctors depending on http method
@api_view(['GET'])
@api_authentication
def doctorHandler(request):
    return getDoctors(request)
    


# Routes to appropriate controls for patients depending on http method
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def patientHandler(request, patient_id=None):
    if request.method == 'GET':
        patients = getPatients(request, patient_id)
        return Response(patients, status=status.HTTP_200_OK)
    if request.method == 'POST':
        return createPatient(request)
    if request.method == 'PATCH':
        return updatePatient(request, patient_id)
    if request.method == 'DELETE':
        return deletePatient(request, patient_id)
    


@api_view(['POST'])
def handleCreate(request): 
    print(request)
    return createUser(request)


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
@api_authentication 
def userHandler(request, user_id=None): 
    if request.method == 'GET':
        if user_id:
            user = getUser(user_id)
            if user:
                return Response(user, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        else: 
            return getUser(request)
    elif request.method == 'PATCH':
        return updateUser(request, user_id)
    elif request.method == 'DELETE':
        success = deleteUser(user_id)
        if success:
            return Response({"success": "User deleted"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


