import React, { useRef } from 'react'
// import { Redirect } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function Login () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { currentUser, login } = useAuth()

  async function handleLoginSubmit (e) {
    console.log('TESTING')

    e.preventDefault()
    try {
      console.log('TESTING')
      await login(emailRef.current.value, passwordRef.current.value)
      // NEEDS CONDITIONAL CHECKING
      localStorage.setItem('loggedIn', true)
      // displays uid and refresh token
      if (currentUser) {
        console.log('IS THIS HAPPENING')
        localStorage.setItem('token', currentUser.refreshToken)
        localStorage.setItem('email', currentUser.email)
        localStorage.setItem('UID', currentUser.uid)
        window.location = '/dashboard'
        // redirectUser(tempUser)
      }
    } catch (e) {
      // error should come back and be more descriptive from request
      alert('ERROR SIGNING UP!' + e)
    }
  }

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <h1>LogIn</h1>
        {/* {currentUser && <Redirect to='/dashboard' />} */}
        {/* {currentUser && currentUser.email}
        {currentUser && currentUser.refreshToken} */}
        <input type='text' ref={emailRef} placeholder='Email'></input>
        <input type='text' ref={passwordRef} placeholder='Password'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
