import React, { useContext, useState, useEffect } from 'react'
import { auth, db, storage } from '../Components/firebase'
import 'firebase/storage'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/auth'
import 'firebase/compat/storage' // <----
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { doc, deleteDoc, setDoc } from 'firebase/firestore'
import 'firebase/firestore'
import { addDoc, collection, getDocs, query, where } from '@firebase/firestore'
// import { tsRestType } from '@babel/types'
import uniqid from 'uniqid'

const AuthContext = React.createContext()

export async function getFileNames(){
    let array=[]
    let storageRef=storage.child(`1/`).listAll().then(res=>{
        res.items.map(item=>{
            array.push(item.name)
        })
        return array
    })
    return storageRef
}
export async function readUserFiles(uid,fileNames){
try{
    let array=[]
let t=storage.child(`${uid}/${fileNames}`)
.getDownloadURL().then(item=>{
    return item
})
return t
}catch(e){
    console.log(e)
}
}

export async function uploadFile (image, uid,name) {
  let id = uniqid()
  console.log(id)
  let storageRef
storageRef=storage.child(`${uid}/${name}`)

try{
    storageRef.put(image).then(() => {})
}catch(e){
    console.log(e)
}

  return id
}



export async function writeToDb (name, email, UID, admin) {
    try {
      await addDoc(collection(db, 'Users'), {
        name: name,
        email: email,
        UID: UID,
        admin: admin
      })
    } catch (e) {
      console.error(e)
    }
  }
  
export function useAuth () {
    return useContext(AuthContext)
  }
  
// logout
export async function logout () {
  return auth.signOut()
}

// end of admin functions
export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  // sign up function
  function signup (email, password) {
    // console.log('is this working')
    return auth.createUserWithEmailAndPassword(email, password)
  }
  // login function
  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unSubscribe
  }, [])

  const value = { currentUser, signup, login }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
