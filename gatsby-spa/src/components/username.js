import React, {useState} from "react"
import {fetchFromAuthServer} from "../services/auth"

export const Username = () => {

  const [username, setUsername] = useState('')

  fetchFromAuthServer('/profile', (data) => setUsername(data.name));

  return (
    <>
      {username}
    </>
  )
}
