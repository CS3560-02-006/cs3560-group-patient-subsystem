from rest_framework.serializers import ModelSerializer
from .models import Appointment, User, Patient, Doctor, Address

class AppointmentSerializer(ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class PatientSerializer(ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
        
class DoctorSerializer(ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class AddressSerializer(ModelSerializer):
    class Meta:
        model = Address
        fiels = '__all__'

