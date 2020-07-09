import React from "react"

import { navigate } from "gatsby"
import { isLoggedIn, getUser, fetchUser } from "../services/auth"

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

  handleSubmit = event => {
    event.preventDefault()
    let formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);

    const requestOptions = {
      method: 'POST',
      body: formData,
    };
    
    const that = this;
    fetch('http://127.0.0.1:5000/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        if(data.code === '200'){
          window.localStorage.setItem('auth_token', data.auth_token);
          fetchUser();
          this.setState(this.state);
        }else{
          console.log("Incorrect creds.");
        }
      })
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