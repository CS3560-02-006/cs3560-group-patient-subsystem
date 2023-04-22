from django.db import connection
from rest_framework.response import Response
from rest_framework import status

def getPatients(request, patient_id=None):
    """
    Get all patients or a single patient by ID
    """
    with connection.cursor() as cursor:
        if patient_id:
            cursor.execute("SELECT * FROM Patient JOIN Address ON Patient.patientID=Address.patientID WHERE Patient.patientID=%s", [patient_id])
            patients = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]
        else:
            cursor.execute("SELECT * FROM Patient JOIN Address ON Patient.patientID=Address.patientID")
            patients = [dict(zip([column[0] for column in cursor.description], row)) for row in cursor.fetchall()]
    
    # Map the patients list to match the frontend interface
    formatted_patients = []
    for patient in patients:
        formatted_patient = {
            'patientID': patient['patientID'],
            'name': patient['name'],
            'dateOfBirth': patient['dateOfBirth'].strftime('%Y-%m-%d'),
            'phoneNumber': patient['phoneNumber'],
            'insuranceProvider': patient['insuranceProvider'],
            'policyNumber': patient['policyNumber'],
            'address': {
                'street': patient['street'],
                'apt': patient['apt'],
                'city': patient['city'],
                'state': patient['state'],
                'zipcode': patient['zipcode'],
            },
        }
        formatted_patients.append(formatted_patient)

    return formatted_patients

def createPatient(request):
    """
    Create a new patient
    """
    name = request.data.get('name')
    date_of_birth = request.data.get('dateOfBirth')
    phone_number = request.data.get('phoneNumber')
    insurance_provider = request.data.get('insuranceProvider')
    policy_number = request.data.get('policyNumber')
    address_data = request.data.get('address')

    if address_data:
        street = address_data.get('street')
        apt = address_data.get('apt')
        city = address_data.get('city')
        state = address_data.get('state')
        zipcode = address_data.get('zipcode')
    else:
        street = None
        apt = None
        city = None
        state = None
        zipcode = None
    
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO Patient (name, dateOfBirth, phoneNumber, insuranceProvider, policyNumber) VALUES (%s, %s, %s, %s, %s)", [name, date_of_birth, phone_number, insurance_provider, policy_number])
        patientID = cursor.lastrowid
        cursor.execute("INSERT INTO Address (patientID, street, apt, city, state, zipcode) VALUES (%s, %s, %s, %s, %s, %s)", [patientID, street, apt, city, state, zipcode])
    
    return Response({"patientID": patientID}, status=status.HTTP_201_CREATED)

def updatePatient(request, patient_id):
    """
    Update a patient's details by ID
    """
    name = request.data.get('name')
    date_of_birth = request.data.get('dateOfBirth')
    phone_number = request.data.get('phoneNumber')
    insurance_provider = request.data.get('insuranceProvider')
    policy_number = request.data.get('policyNumber')
    address_data = request.data.get('address', {})
    street = address_data.get('street') if address_data else None
    apt = address_data.get('apt') if address_data else None
    city = address_data.get('city') if address_data else None
    state = address_data.get('state') if address_data else None
    zipcode = address_data.get('zipcode') if address_data else None

    update_fields = {}
    if name:
        update_fields['name'] = name
    if date_of_birth:
        update_fields['dateOfBirth'] = date_of_birth
    if phone_number:
        update_fields['phoneNumber'] = phone_number
    if insurance_provider:
        update_fields['insuranceProvider'] = insurance_provider
    if policy_number:
        update_fields['policyNumber'] = policy_number
        
    with connection.cursor() as cursor:
        if update_fields:
            set_clause = ', '.join([f"{field}=%s" for field in update_fields.keys()])
            set_values = list(update_fields.values())
            set_values.append(patient_id)
            cursor.execute(f"UPDATE Patient SET {set_clause} WHERE patientID=%s", set_values)
        
        if street or apt or city or state or zipcode:
            cursor.execute("UPDATE Address SET street=COALESCE(%s, street), apt=COALESCE(%s, apt), city=COALESCE(%s, city), state=COALESCE(%s, state), zipcode=COALESCE(%s, zipcode) WHERE patientID=%s", [street, apt, city, state, zipcode, patient_id])
        
        # Check if the patient was updated successfully
        cursor.execute("SELECT * FROM Patient JOIN Address ON Patient.patientID=Address.patientID WHERE Patient.patientID=%s", [patient_id])
        patient = cursor.fetchone()
    
    if patient:
        return Response(patient, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

def deletePatient(request, patient_id):
    """
    Delete a patient by ID
    """
    print(id)
    with connection.cursor() as cursor:
        # Delete the address record(s) associated with the patient
        cursor.execute("DELETE FROM Address WHERE patientID=%s", [patient_id])
        address_rows_affected = cursor.rowcount

        # Delete the patient record
        cursor.execute("DELETE FROM Patient WHERE patientID=%s", [patient_id])
        patient_rows_affected = cursor.rowcount

    # Check if any records were affected
    if address_rows_affected > 0 or patient_rows_affected > 0:
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)
    