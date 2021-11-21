import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/storage' // <----
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import { getFirestore } from 'firebase/firestore'
// change to .env variables
const app = firebase.initializeApp({
    apiKey: "AIzaSyCIS_J-sLFmk0ufF674JO5iTc-clbl8aos",
    authDomain: "nft-collector-4a0d3.firebaseapp.com",
    projectId: "nft-collector-4a0d3",
    storageBucket: "nft-collector-4a0d3.appspot.com",
    messagingSenderId: "492507691883",
    appId: "1:492507691883:web:77b5815a0f5c0793beaa2e",
    measurementId: "G-VLVR8YS5DP"
  })
  // auth login/signup
  export const auth = app.auth()
  // file storage
  export const storage = app.storage().ref()
  // database
  export const db = getFirestore()
  
  