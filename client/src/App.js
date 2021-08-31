import React, {useState, useEffect} from 'react';
import './App.css';
import firebase from './components/firebase';
import Login from './components/login';
import Hero from './components/hero';
//import { useOktaAuth } from "@okta/okta-react";


const App = () => {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
      setEmailErr('');
      setPasswordErr('');
  };

  /*const handleLogin = () => {
    clearErrors();
    //const { authState } = useOktaAuth();
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          switch(err.code){
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailErr(err.message);
              break;
            case "auth/wrong-password":
              setPasswordErr(err.message);
              break;
          }
        })
  };*/

  const handleSignup = () => {
    clearErrors();
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          switch(err.code){
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailErr(err.message);
              break;
            case "auth/weak-password":
              setPasswordErr(err.message);
              break;
          }
        })
  };

  const handleLogout = () => {
      firebase.auth().signOut();
  };

  const authListener = () => {
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          clearInputs();
          setUser(user);
        } else {
          setUser('');
        }
      });
  };

  useEffect( () => {
    authListener();
  },[]);

  return (
    <div className="App">
      {user ? (
          <Hero handleLogout={handleLogout} />
      ) : (
        <Login 
          handleSignup={handleSignup}
        />
      )}
      
    </div>
  );
}

export default App;