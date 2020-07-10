import React from "react"

import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    let formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    await fetch('http://127.0.0.1:5000/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.code === '200'){
          window.localStorage.setItem('auth_token', data.auth_token);
        }else{
          console.log("Incorrect creds.");
        }
      })

    if(isLoggedIn()){
      this.setState(this.state);
    }
  }

  render() {
    if(isLoggedIn()){
      navigate('/app/profile')
    }

    return (
      <>
      <h1>Log In</h1>
      <form
        method="POST"
        onSubmit = {event => {
          this.handleSubmit(event)
        }}
      >
        <label htmlFor='username'>
          Username
          <input type='text' name='username' onChange={this.handleUpdate} />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            onChange={this.handleUpdate} />
        </label>
        <input type='submit' value='Log In' />
      </form>
      </>
    )
  }
}