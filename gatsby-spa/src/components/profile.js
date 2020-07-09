import React from "react"
import {getUser} from "../services/auth"

const Profile = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: {getUser()} </li>
      <li>E-mail: {getUser()} </li>
    </ul>
  </>
)

export default Profile