import React, {useState} from 'react';
import './navbar.css';
import { FaParking } from 'react-icons/fa';

const Login = (props) => {

    /*const {
        email, 
        setEmail,
        password, 
        setPassword, 
        handleLogin, 
        handleSignup, 
        hasAccount, 
        setHasAccount, 
        emailErr, 
        passwordErr
    } = props;*/
    const {handleSignup} = props;
  
  const [email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [hasAccount, setHasAccount] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {email, password};
    

    fetch('http://92.87.91.43:4000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then( () => {
        console.log(data)
        console.log('login');
    })

    props.history.push('/home');
    
}

    return(
        <section className="login">
            <div className="loginContainer">
            <FaParking className="navbar-logo"/>
            <h2 style={{ color: '#fff', textAlign: "center" }}>NOKIA Smart Parking</h2>
            <br />
                <label>Username</label>
                <input 
                    type="text"
                    autoFocus
                    required value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailErr}</p>

                <label>Password</label>
                <input 
                    type="password"
                    required value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordErr}</p>
                    
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button  onClick={handleLogin}>
                            Sign In
                        </button>
                        <p>
                            Don't have an acoount ? 
                            <span onClick={ () => setHasAccount(!hasAccount)}>
                                Sign Up
                            </span>
                        </p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignup}>
                            Sign Up  
                        </button>
                        <p>
                            Have an account ? 
                            <span onClick={ () => setHasAccount(!hasAccount)}>
                                Sign In
                            </span>
                        </p>
                        </>
                    ) };
                </div>
            </div>
        </section>
    )
}

export default Login;