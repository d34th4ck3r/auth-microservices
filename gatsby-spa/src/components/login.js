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

  handleSubmit = event => {
    event.preventDefault()
    // handleLogin(this.state)
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
          navigate('/app/profile')
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