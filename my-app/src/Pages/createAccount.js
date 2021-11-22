import React, { useRef } from 'react'
import { useAuth, writeToDb } from '../context/AuthContext'
export default function CreateAccount () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()
  const adminYesRef = useRef()
  const adminNoRef = useRef()
  const { signup, currentUser, login } = useAuth()
if(currentUser){
    window.location='/dashboard'
}
  async function handleSubmit (e) {
    // console.log('TESTING')
    e.preventDefault()
    // let admin = adminYesRef.current.checked
    // let secondAdmin = adminNoRef.current.checked
    // console.log(admin)
    // console.log(secondAdmin)

    try {
      let t = localStorage.setItem('loggedIn', true)
      // this can be used within our current component
      // function below creates the account
      await signup(emailRef.current.value, passwordRef.current.value)

      // this is the problem current user does not alway exist after creating user
      console.log(currentUser)
      alert('Account Created')
      // when user creates account the current userr is not recongized but the account is created
      window.location = '/login'
      if (currentUser) {
        // console.log(t)
        localStorage.setItem('token', currentUser.refreshToken)
        localStorage.setItem('email', currentUser.email)
        localStorage.setItem('UID', currentUser.uid)
        // write to data base of users
        await writeToDb(
          nameRef.current.value,
          emailRef.current.value,
          currentUser.uid,
        //   admin
        )
        // window.location = '/dashboard'
        alert('Account Created')
        // window.location = '/login'
      } else {
        console.log('current user not here :(')
      }
    } catch (e) {
      // error should come back and be more descriptive from request
      console.error('did not work' + e)
      console.log(currentUser)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        {/* {currentUser && currentUser.email}
        {currentUser && currentUser.refreshToken} */}
        <input type='text' ref={nameRef} placeholder='Name'></input>
        <input type='text' ref={emailRef} placeholder='Email'></input>
        <input type='text' ref={passwordRef} placeholder='Password'></input>
        <button type='submit'>Text</button>
      </form>
    </div>
  )
}
