import jwt
import datetime
from flask import request, jsonify

SECRET_KEY = 'MY_SECRET'

def generate_auth_token(username):
  try:
    payload = {
      'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=5),
      'iat': datetime.datetime.utcnow(),
      'sub': username,
    }
    return jwt.encode(
      payload,
      SECRET_KEY,
      algorithm='HS256',
    )
  except Exception as e:
    return e

def decode_auth_token(auth_token):
  try:
    return jwt.decode(auth_token, SECRET_KEY)
  except jwt.InvalidSignatureError:
    raise Exception('Invalid Signature')
  except jwt.ExpiredSignatureError:
    raise Exception('Signature Expired. Login again.')
  except jwt.InvalidTokenError:
    raise Exception('Invalid Token. Login again to get valid token.')


def login_required(func):
  def wrapper(*args, **kwargs):
    auth_header = request.headers.get('Authorization')
    try:
      if auth_header and auth_header.split(' ')[1] and decode_auth_token(auth_header.split(' ')[1]):
          return func(*args, **kwargs)
      else:
        return jsonify({
          'success': 'false',
          'message': 'Need JWT to access this endpoint',
        })
    except Exception as e:
      return jsonify({
      'success': 'false',
      'message': str(e),
    })
  return wrapper
      

def get_user():
  try:
    auth_header = request.headers.get('Authorization')
    if auth_header:
      auth_token = auth_header.split(' ')[1]
      payload = decode_auth_token(auth_token)
      return payload['sub']
  except Exception as e:
    raise e
