from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from scheduling.controllers.appointments import getAppointments, createAppointment, updateAppointment, deleteAppointment
from scheduling.controllers.patients import getPatients, createPatient, updatePatient, deletePatient
from scheduling.controllers.doctors import  getDoctors
from scheduling.controllers.auth import createUser, updateUser, deleteUser

# Routes to appropriate controls for appointments depending on http method
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def appointmentHandler(request):
    if request.method == 'GET':
        return getAppointments(request)
    if request.method == 'POST':
        return createAppointment(request)
    if request.method == 'PUT':
        return updateAppointment(request)
    if request.method == 'DELETE':
        return deleteAppointment(request)

# Routes to appropriate controls for doctors depending on http method
@api_view(['GET'])
def doctorHandler(request):
    return getDoctors(request)
    


# Routes to appropriate controls for patients depending on http method
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def patientHandler(request):
    if request.method == 'GET':
        return getPatients(request)
    if request.method == 'POST':
        return createPatient(request)
    if request.method == 'PUT':
        return updatePatient(request)
    if request.method == 'DELETE':
        return deletePatient(request)
    

@api_view(['POST', 'PUT', 'DELETE'])
def authenticationHandler(request):
    if request.method == 'POST':
        return createUser(request)
    if request.method == 'PUT':
        return updateUser(request)
    if request.method == 'DELETE':
        return deleteUser(request)