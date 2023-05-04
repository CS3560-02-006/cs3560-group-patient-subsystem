from django.db import connection
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta
import hashlib
import os
import base64
import hmac
import json


def getUser(user_id):
    try:
        with connection.cursor() as cursor:
            # Fetch user with the given user_id
            cursor.execute(
                "SELECT userID, email, userType, patientID FROM appointmentsdb.User WHERE userID = %s", [user_id])
            user = cursor.fetchone()
            if user:
                return {
                    'userID': user[0],
                    'email': user[1],
                    'userType': user[2],
                    'patientID': user[3],
                }
            else:
                return None
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def createUser(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        userType = request.data.get('userType')
        patientID = request.data.get('patientID')

        # Generate salt and hash the password
        salt = os.urandom(32)
        password_hash = hashlib.pbkdf2_hmac(
            'sha512', password.encode(), salt, 100000)

        with connection.cursor() as cursor:
            # Check if a user with the same email already exists
            cursor.execute(
                "SELECT * FROM appointmentsdb.User WHERE email = %s", [email])
            existing_email_user = cursor.fetchone()

            # If a user with the same email exists, return an error response
            if existing_email_user:
                return Response({"error": "A user with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)

            # Check if a user with the same patientID already exists
            cursor.execute(
                "SELECT * FROM appointmentsdb.User WHERE patientID = %s", [patientID])
            existing_user = cursor.fetchone()

            # If a user with the same patientID exists, return an error response
            if existing_user:
                return Response({"error": "A user with this patientID already exists"}, status=status.HTTP_400_BAD_REQUEST)

            # If no such user exists, insert the new user record
            cursor.execute("INSERT INTO appointmentsdb.User (email, passwordHash, passwordSalt, userType, patientID) VALUES (%s, %s, %s, %s, %s)", [
                           email, password_hash, salt, userType, patientID])
            user_id = cursor.lastrowid

        return Response({"userID": user_id}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def updateUser(request, user_id):
    try:
        email = request.data.get('email')
        password = request.data.get('password')
        userType = request.data.get('userType')
        patientID = request.data.get('patientID')

        update_fields = {}
        if email:
            update_fields['email'] = email
        if userType:
            update_fields['userType'] = userType
        if patientID is not None:
            update_fields['patientID'] = patientID

        with connection.cursor() as cursor:
            if password:
                # Get salt and hash the new password
                cursor.execute(
                    "SELECT passwordSalt FROM appointmentsdb.User WHERE userID=%s", [user_id])
                salt = cursor.fetchone()[0]
                password_hash = hashlib.pbkdf2_hmac(
                    'sha512', password.encode(), salt, 100000)
                update_fields['passwordHash'] = password_hash

            if update_fields:
                # Update fields with new values
                set_clause = ', '.join(
                    [f"{field}=%s" for field in update_fields.keys()])
                set_values = list(update_fields.values())
                set_values.append(user_id)
                cursor.execute(
                    f"UPDATE appointmentsdb.User SET {set_clause} WHERE userID=%s", set_values)

        return Response(status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def deleteUser(user_id):
    try:
        with connection.cursor() as cursor:
            # Execute delete query for the user with the given user_id
            cursor.execute(
                "DELETE FROM appointmentsdb.User WHERE userID = %s", [user_id])
            
            # Check if any rows were affected by the query
            return cursor.rowcount > 0
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def loginUser(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        cursor = connection.cursor()
        # Fetch user with the given email
        cursor.execute(
            "SELECT userID, passwordHash, passwordSalt, userType, patientID FROM appointmentsdb.User WHERE email = %s", [email])
        user = cursor.fetchone()

        if user:
            user_id, stored_hash, salt, user_type, patient_id = user
            # Hash the input password with the stored salt
            password_hash = hashlib.pbkdf2_hmac(
                'sha512', password.encode(), salt, 100000)

            # Compare the input password hash with the stored hash
            if password_hash == stored_hash:
                # Generate and encode the JWT token
                token_payload = generate_token(user_id, email, user_type)
                token = encode_token(token_payload)
                response = {
                    'userID': user_id,
                    'email': email,
                    'userType': user_type,
                    'patientID': patient_id,
                    'token': token,
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def generate_token(user_id, email, user_type):
    # Set token expiration to 7 days from now
    exp = datetime.utcnow() + timedelta(days=7)
    
    # Create the token payload
    payload = {
        'sub': user_id,
        'email': email,
        'user_type': user_type,
        'exp': int(exp.timestamp()),
    }
    return payload

def encode_token(payload):
    # Define the JWT header
    header = {'typ': 'JWT', 'alg': 'HS256'}
    header_json = json.dumps(header, separators=(',', ':'))
    payload_json = json.dumps(payload, separators=(',', ':'))

    # Base64 encode the header and payload
    header_b64 = base64.urlsafe_b64encode(
        header_json.encode('utf-8')).decode('utf-8').rstrip('=')
    payload_b64 = base64.urlsafe_b64encode(
        payload_json.encode('utf-8')).decode('utf-8').rstrip('=')

    # Create the token signature using the SECRET_KEY
    signature = hmac.new(settings.SECRET_KEY.encode(
        'utf-8'), f'{header_b64}.{payload_b64}'.encode('utf-8'), hashlib.sha256).digest()
    
    # Base64 encode the signature
    signature_b64 = base64.urlsafe_b64encode(
        signature).decode('utf-8').rstrip('=')

    # Return the complete JWT token
    return f'{header_b64}.{payload_b64}.{signature_b64}'
