from flask import Flask, jsonify, request
from jwt_helper import generate_auth_token, login_required, get_user

app = Flask(__name__)

@app.route('/')
def index():
  try:
    user = get_user()
    if user:
      return jsonify({
        'name': user,
        'desc': 'This is a logged in user.',
      })
    return jsonify({
      'message': 'This is Anon user.',
    })
  except Exception as e:
    return jsonify({
      'message': 'This is Anon user.',
      'error':  str(e)
    })
  

@app.route('/login', methods=['POST'])
def login():
  username = request.form.get('username')
  password = request.form.get('password')
  if(username=='gautam' and password=='scooby'):  #Hard Coded Username/Password (NOTE: Do not use in production!)
    return jsonify({
      'success': 'true',
      'auth_token': generate_auth_token(username).decode(),
    })
  return jsonify({
    'success': 'false',
    'message': 'Incorrect user/pass.',
  })


@app.route('/profile')
@login_required
def profile():
  try:
    return jsonify({
      'name': get_user(),
      'message': 'This is a private page.',
    })
  except Exception as e:
    return jsonify({
      'message:' 'Unable to access resource: ' + str(e),
    })

app.run()