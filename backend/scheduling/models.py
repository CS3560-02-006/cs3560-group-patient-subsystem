from django.db import models

# Model for Person class. Contains all attributes
class Person (models.Model):
    personID = models.IntegerField(primary_key=True)
    name = models.TextField()
    dob = models.DateField()
    phoneNumber = models.TextField()
    
    class Meta:
        abstract = True


# Model for Doctor class. Contains all attributes
class Doctor(Person):
    doctorID = models.IntegerField(primary_key=True)
    specialization = models.TextField()


# Model for Schedule class. Contains all attributes
class Schedule(models.Model):
    id = models.ImageField(primary_key=True)
    doctorid = models.ForeignKey()
    dayofweek = models.IntegerField()
    start = models.TimeField()
    end = models.TimeField()

# Model for Patient class. Contains all attributes
class Patient(Person):
    patientID = models.IntegerField(primary_key=True)
    insuranceProvider = models.TextField()
    policyNumber = models.TextField()

class User(models.Model):
    userID = models.IntegerField(primary_key=True)
    email = models.TextField()
    password = models.TextField()
    userType = models.TextField()

# Model for appointment class. Contains all attributes
class Appoinment(models.Model):
    appointmentID = models.IntegerField(primary_key=True)
    doctorID = models.ForeignKey()
    patientID = models.ForeignKey()
    date = models.DateField()
    time = models.TimeField()
    status = models.TextField()
    description = models.TextField()


