import { navigate } from "gatsby";


export const isBrowser = () => typeof window !== 'undefined'

export const fetchFromAuthServer = (endpoint, callback) => {

  const auth_token = window.localStorage.getItem('auth_token');
  if(!auth_token){
    return null;
  }

  const requestParams = {
    headers: new Headers({
      'Authorization': 'Bearer ' + auth_token,
    }),
  }

  fetch('http://127.0.0.1:5000' + endpoint, requestParams)
    .then(response => response.json())
    .then(data => {
      if(data && data.code === '200'){
        callback(data);
      }else{
        logout()
      }
    })

}



export const isLoggedIn = () => {
  const auth_token = window.localStorage.getItem('auth_token');
  return !!auth_token;
}

export const logout = () => {
  window.localStorage.removeItem('auth_token');
  window.localStorage.removeItem('user');
  navigate('/app/login')
}
