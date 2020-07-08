from flask import Flask, jsonify, request
from jwt_helper import generate_auth_token, login_required, get_user

app = Flask(__name__)

@app.route('/')
def index():
  response = None
  try:
    user = get_user()
    if user:
      response =jsonify({
        'code': '200',
        'name': user,
        'message': 'This is a logged in user.',
      })
    response = jsonify({
      'code': '200',
      'message': 'This is Anon user.',
    })
  except Exception as e:
    response = jsonify({
      'code': '401',
      'message': 'This is Anon user.',
      'error':  str(e)
    })
  response.headers.add("Access-Control-Allow-Origin", "*")
  response.headers.add('Access-Control-Allow-Headers', "*")
  response.headers.add('Access-Control-Allow-Methods', "*")
  return response
  

@app.route('/login', methods=['POST'])
def login():
  username = request.form.get('username')
  password = request.form.get('password')
  if(username=='gautam' and password=='scooby'):  #Hard Coded Username/Password (NOTE: Do not use in production!)
    return jsonify({
      'code': '200',
      'auth_token': generate_auth_token(username).decode(),
    })
  return jsonify({
    'code': '401',
    'message': 'Incorrect user/pass.',
  })


@app.route('/profile')
@login_required
def profile():
  try:
    return jsonify({
      'code': '200',
      'name': get_user(),
      'message': 'This is a private page.',
    })
  except Exception as e:
    return jsonify({
      'code': '403',
      'message': 'Unable to access resource: ' + str(e),
    })

app.run()
