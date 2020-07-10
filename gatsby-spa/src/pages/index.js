import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { Username, isLoggedIn } from "../services/auth"

export default function Home() {
  return (
    <Layout>
      <h1>Hello {isLoggedIn()? <Username /> : "world"}!</h1>
      <p>
        {isLoggedIn() ? (
          <>
            You are logged in, so check your{" "}
            <Link to="/app/profile">profile</Link>
          </>
        ) : (
          <>
            You should <Link to="/app/login">log in</Link> to see restricted
            content
          </>
        )}
      </p>
    </Layout>
  )
}