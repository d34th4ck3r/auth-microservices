import React from "react"
import { Link, navigate } from "gatsby"
import ReactDOMServer from 'react-dom/server';
import { isLoggedIn, logout } from '../services/auth'
import { Username } from "../components/username"

export default function NavBar() {

  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      { isLoggedIn() ? 
      <span> Hello <Username/> </span>
      : 
       <span> You are not logged in </span>
      }
      
      <nav>
        <Link to="/">Home</Link>
        {` `}
        <Link to="/app/profile">Profile</Link>
        {` `}
        {isLoggedIn() ? (
          <a
            href='/'
            onClick={event => {
              event.preventDefault()
              logout()
            }}
          >
            Log out
          </a>
        ) : null}
      </nav>
    </div>
  )
}