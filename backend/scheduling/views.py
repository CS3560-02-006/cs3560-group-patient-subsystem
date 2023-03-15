from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from .controls import getAppointments, createAppointment, updateAppointment, deleteAppointment, getPatients, createPatient, updatePatient, deletePatient, getDoctors

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