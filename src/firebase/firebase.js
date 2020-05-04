import firebase from "firebase";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyDM_nw8ka9sM24E8uBW4NZo-pok94nObCo",
    authDomain: "book-store-0123.firebaseapp.com",
    databaseURL: "https://book-store-0123.firebaseio.com",
    projectId: "book-store-0123",
    storageBucket: "book-store-0123.appspot.com",
    messagingSenderId: "301205488408",
    appId: "1:301205488408:web:d0649a50a060d055ed546d",
    measurementId: "G-9GSQ5MLDZ6"
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider
};
