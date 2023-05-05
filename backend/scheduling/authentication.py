import base64
import hashlib
import hmac
import json
from django.conf import settings
from datetime import datetime
from django.http import JsonResponse


# Define a custom decorator for API authentication
def api_authentication(view_func):
    # Wrap the input view function with authentication logic
    def _wrapped_view(request, *args, **kwargs):
        # Retrieve the Authorization header from the incoming request
        auth_header = request.META.get('HTTP_AUTHORIZATION', None)

        # Check if the header exists and starts with 'Bearer '
        if auth_header is not None and auth_header.startswith('Bearer '):
            # Extract the token from the header
            token = auth_header[7:]
            try:
                # Decode the token and check its validity
                payload = decode_token(token)
                exp = datetime.fromtimestamp(payload['exp'])
                # Check if the token has not expired
                if exp > datetime.now():
                    # Proceed with executing the view function
                    return view_func(request, *args, **kwargs)
                else:
                    print('Token expired')
            except Exception as e:
                print(f'Error: {e}')
                pass

        # If the token is invalid or expired, return an Unauthorized response
        return JsonResponse({"error": "Unauthorized"}, status=401)

    # Return the wrapped view function
    return _wrapped_view


# Function to decode and verify the provided token
def decode_token(token):
    # Split the token into header, payload and signature
    parts = token.split('.')

    # Check if the token has the correct format (three parts)
    if len(parts) != 3:
        print('Invalid token format')
        return None

    # Decode the payload (middle part of the token)
    payload = parts[1].rstrip('=')
    try:
        # Add padding to make the base64 string length a multiple of 4
        payload = base64.urlsafe_b64decode(payload + '===')
        # Convert the decoded payload from bytes to a JSON object
        payload = json.loads(payload)
    except:
        print('Invalid base64-encoded string')
        return None

    # Check if the token has expired by exracting expiration time stamp from payload
    exp = datetime.fromtimestamp(payload['exp'])
    # Compare the expiration timestamp with the current time
    if datetime.utcnow() > exp:
        print('Token has expired')
        return None

    # Check the signature, third part of token, for integrity
    signature = base64.urlsafe_b64decode(parts[2] + '===')
    
     # Calculate the expected signature using the header, payload, and secret key
    expected_signature = hmac.new(settings.SECRET_KEY.encode(
        'utf-8'), parts[0].encode('utf-8') + b'.' + parts[1].encode('utf-8'), hashlib.sha256).digest()
    
    # Compare the actual signature with the expected signature
    if not hmac.compare_digest(signature, expected_signature):
        print('Invalid signature')
        return None

    # Return the payload
    return payload
