import jwt
import datetime

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