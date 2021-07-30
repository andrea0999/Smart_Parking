import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyB6UdeVtZJRK4X6SEZjAY361cBKGdEIt6M",
    authDomain: "smart-parking-b3f89.firebaseapp.com",
    projectId: "smart-parking-b3f89",
    storageBucket: "smart-parking-b3f89.appspot.com",
    messagingSenderId: "872124834262",
    appId: "1:872124834262:web:6a38ac986f7735d405c477"
  };
  
  const fire = firebase.initializeApp(firebaseConfig);

  export default firebase;