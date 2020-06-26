import json
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
  return jsonify({
    'name': 'Gautam',
    'desc': 'I am a Software Developer.',
  })

app.run()