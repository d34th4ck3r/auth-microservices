import React from "react"
import {Username} from "../components/username"

const Profile = () => (
  <>
    <h1>Your profile</h1>
    <ul>
      <li>Name: <Username /> </li>
    </ul>
  </>
)

export default Profile