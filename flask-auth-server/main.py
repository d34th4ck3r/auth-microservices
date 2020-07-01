import json
from flask import Flask, jsonify, request
import jwt
import datetime

app = Flask(__name__)

SECRET_KEY = 'MY_SECRET'

def encode_auth_token():
  try:
    payload = {
      'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=5),
      'iat': datetime.datetime.utcnow(),
      'sub': 'gautam',
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
    return 'Invalid Signature'
  except jwt.ExpiredSignatureError:
    return 'Signature Expired. Login again.'
  except jwt.InvalidTokenError:
    return 'Invalid Token. Login again to get valid token.'

@app.route('/')
def index():
  return jsonify({
    'name': 'Gautam',
    'desc': 'I am a Software Developer.',
  })

@app.route('/login', methods=['POST'])
def login():
  username = request.form.get('username')
  password = request.form.get('password')
  if(username=='gautam' and password=='scooby'):  #Hard Coded Username/Password (NOTE: Do not use in production!)
    return jsonify({
      'success': 'true',
    })
  return jsonify({
    'success': 'false'
  })

app.run()