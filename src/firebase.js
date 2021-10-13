import firebase from "firebase/app";
import "firebase/auth"

export const auth= firebase.initializeApp({
    apiKey: "AIzaSyCFQebBnadtFWQZUQbtbd2I8v3S6j3MzkY",
    authDomain: "chatify-1309c.firebaseapp.com",
    projectId: "chatify-1309c",
    storageBucket: "chatify-1309c.appspot.com",
    messagingSenderId: "858326279299",
    appId: "1:858326279299:web:9e53d84a8148de905327b6"
  }).auth();