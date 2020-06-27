export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('myUser') ? JSON.parse(window.localStorage.getItem('myUser')) : {}


const setUser = user =>
  window.localStorage.setItem('myUser', JSON.stringify(user))

  export const handleLogin = ({username, password}) => {
    if(username===`gautam` && password===`secret`){
      return setUser({
        username: `gautam`,
        name: `Gautam`,
        email: `fake@email.com`,
      })
    }
    return false
  }


  export const isLoggedIn = () => {
    const user = getUser()

    return !!user.username
  }

  export const logout = callback => {
    setUser({})
    callback()
  }
