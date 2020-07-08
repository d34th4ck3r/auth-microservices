import React, {useEffect, useState} from "react"


export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () => {

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

  console.log("Here 1");
  fetch('http://127.0.0.1:5000/profile', requestParams)
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


export const isLoggedIn = () => {
  const user = getUser();

  return !!user;
}

export const logout = callback => {
  window.localStorage.removeItem('auth_token');
  window.localStorage.removeItem('user');
}
