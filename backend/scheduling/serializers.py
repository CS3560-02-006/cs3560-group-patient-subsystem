from rest_framework.serializers import ModelSerializer
from .models import Appointment, User, Patient, Doctor

class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class User(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class Patient(ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        

class Doctor(ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'