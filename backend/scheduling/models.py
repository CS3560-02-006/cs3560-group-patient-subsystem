# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    patient_patientid = models.OneToOneField('Patient', models.DO_NOTHING, db_column='Patient_patientID', primary_key=True)  # Field name made lowercase.
    street = models.CharField(max_length=45)
    apt = models.CharField(max_length=45, blank=True, null=True)
    city = models.CharField(max_length=45)
    state = models.CharField(max_length=45)
    zipcode = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'Address'


class Appointment(models.Model):
    appointmentid = models.AutoField(db_column='appointmentID', primary_key=True)  # Field name made lowercase.
    doctor_doctorid = models.ForeignKey('Doctor', models.DO_NOTHING, db_column='Doctor_doctorID')  # Field name made lowercase.
    patient_patientid = models.ForeignKey('Patient', models.DO_NOTHING, db_column='Patient_patientID', blank=True, null=True)  # Field name made lowercase.
    date = models.DateField()
    starttime = models.TimeField(db_column='startTime')  # Field name made lowercase.
    endtime = models.TimeField(db_column='endTime')  # Field name made lowercase.
    status = models.CharField(max_length=45)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'Appointment'


class Doctor(models.Model):
    doctorid = models.AutoField(db_column='doctorID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=255)
    dateofbirth = models.DateField(db_column='dateofBirth')  # Field name made lowercase.
    specialty = models.CharField(max_length=45)

    class Meta:
        managed = False
        db_table = 'Doctor'


class Patient(models.Model):
    patientid = models.AutoField(db_column='patientID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=255)
    dateofbirth = models.DateField(db_column='dateOfBirth')  # Field name made lowercase.
    phonenumber = models.CharField(db_column='phoneNumber', max_length=45)  # Field name made lowercase.
    insuranceprovider = models.CharField(db_column='insuranceProvider', max_length=45, blank=True, null=True)  # Field name made lowercase.
    policynumber = models.CharField(db_column='policyNumber', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Patient'


class User(models.Model):
    userid = models.AutoField(db_column='userID', primary_key=True)  # Field name made lowercase.
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    usertype = models.CharField(db_column='userType', max_length=45)  # Field name made lowercase.
    patient_patientid = models.ForeignKey(Patient, models.DO_NOTHING, db_column='Patient_patientID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'User'