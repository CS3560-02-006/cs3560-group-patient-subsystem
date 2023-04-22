import base64
import hashlib
import hmac
import json
from django.conf import settings
from datetime import datetime
from django.http import JsonResponse

def api_authentication(view_func):
    def _wrapped_view(request, *args, **kwargs):
        auth_header = request.META.get('HTTP_AUTHORIZATION', None)

        if auth_header is not None and auth_header.startswith('Bearer '):
            token = auth_header[7:]
            try:
                payload = decode_token(token)
                exp = datetime.fromtimestamp(payload['exp'])
                if exp > datetime.now(): 
                    return view_func(request, *args, **kwargs) 
                else:
                    print('Token expired')
            except Exception as e:
                print(f'Error: {e}')
                pass

        return JsonResponse({"error": "Unauthorized"}, status=401)

    return _wrapped_view

def decode_token(token):
    # Split the token into header, payload and signature
    parts = token.split('.')
    if len(parts) != 3:
        print('Invalid token format')
        return None

    # Decode the payload
    payload = parts[1].rstrip('=')
    try:
        payload = base64.urlsafe_b64decode(payload + '===')
        print(f'Decoded payload: {payload}')
        payload = json.loads(payload)
    except:
        print('Invalid base64-encoded string')
        return None

    # Check if the token has expired
    exp = datetime.fromtimestamp(payload['exp'])
    if datetime.utcnow() > exp:
        print('Token has expired')
        return None

    # Check the signature
    signature = base64.urlsafe_b64decode(parts[2] + '===')
    expected_signature = hmac.new(settings.SECRET_KEY.encode('utf-8'), parts[0].encode('utf-8') + b'.' + parts[1].encode('utf-8'), hashlib.sha256).digest()
    if not hmac.compare_digest(signature, expected_signature):
        print('Invalid signature')
        return None

    # Return the payload
    return payload