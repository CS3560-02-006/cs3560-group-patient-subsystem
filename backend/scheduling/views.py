from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from scheduling.controllers.appointments import getAppointments, createAppointment, updateAppointment, deleteAppointment
from scheduling.controllers.patients import getPatients, createPatient, updatePatient, deletePatient
from scheduling.controllers.doctors import  getDoctors
from scheduling.controllers.auth import createUser, updateUser, deleteUser

# Routes to appropriate controls for appointments depending on http method
@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
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
    

@api_view(['POST', 'PATCH', 'DELETE'])
def authenticationHandler(request):
    if request.method == 'POST':
        return createUser(request)
    if request.method == 'PATCH':
        return updateUser(request)
    if request.method == 'DELETE':
        return deleteUser(request)
    