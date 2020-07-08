import React, {useEffect, useState} from "react"


export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('myUser') ? JSON.parse(window.localStorage.getItem('myUser')) : {}


const setUser = user =>
  window.localStorage.setItem('myUser', JSON.stringify(user))


export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}
  

export const HandleLogin = ({username, password}) => {

  const [resp, setResp] = useState({})

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
    };

    fetch('http://127.0.0.1:5000/', requestOptions)
        .then(response => response.json())
        .then(data => setResp(data))
  
  }, []);

  return (
    <div>
      {resp.message}
    </div>
  )
}



