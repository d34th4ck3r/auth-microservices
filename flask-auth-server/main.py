import json
from flask import Flask, jsonify, request
from jwt_helper import generate_auth_token, decode_auth_token

app = Flask(__name__)

@app.route('/')
def index():
  return jsonify({
    'name': 'Gautam',
    'desc': 'I am a Software Developer.',
  })


@app.route('/login', methods=['POST'])
def login():
  auth_header = request.headers.get('Authorization')
  username = request.form.get('username')
  password = request.form.get('password')
  if auth_header:
    auth_token = auth_header.split(" ")[1]
    if auth_token:
      payload = decode_auth_token(auth_token)
      print(payload)
      if payload['sub'] == username:
        return jsonify({
          'success': 'true',
          'message': "Already signed in",
        })
  if(username=='gautam' and password=='scooby'):  #Hard Coded Username/Password (NOTE: Do not use in production!)
    return jsonify({
      'success': 'true',
      'auth_token': generate_auth_token(username).decode(),
    })
  return jsonify({
    'success': 'false'
  })

app.run()