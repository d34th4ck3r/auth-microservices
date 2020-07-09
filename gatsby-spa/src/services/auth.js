import React, {useEffect, useState} from "react"


export const isBrowser = () => typeof window !== 'undefined'

export const fetchUser = async () => {

  let user = window.localStorage.getItem('user');
  if(!!user){
    return user;
  }

  const auth_token = window.localStorage.getItem('auth_token');

  if(!auth_token){
    return null;
  }

  const requestParams = {
    headers: new Headers({
      'Authorization': 'Bearer ' + auth_token,
    }),
  }

  await fetch('http://127.0.0.1:5000/profile', requestParams)
    .then(response => response.json())
    .then(data => {
      if(data.code === '200'){
        setUser(data.name);
      }else{
        logout()
      }
    })

}


const setUser = user =>
  window.localStorage.setItem('user', user);

export const getUser = () => {
  return window.localStorage.getItem('user');
}


export const isLoggedIn = () => {
  const auth_token = window.localStorage.getItem('auth_token');
  return !!auth_token;
}

export const logout = callback => {
  window.localStorage.removeItem('auth_token');
  window.localStorage.removeItem('user');
}
