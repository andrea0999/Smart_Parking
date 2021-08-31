import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router,  Switch, Route} from 'react-router-dom';
import './navbar.css';
import { Button } from './Button';
import Home from './pages/home';
import Feedback2 from './pages/Feedback2';
import Users from './pages/users';
import Logout from './pages/logout';
import ParkingMap from './pages/parkingMap';
import Configurations from './pages/configurations';
import Analitycs from './pages/analitycs';
import AddConfiguration from './pages/addConfiguration';
import UpdateConfiguration from './pages/updateConfiguration';
import StartInstance from './pages/startInstance';
import { NavDropdown } from 'react-bootstrap';
import ViewStream from './pages/viewStream';
import Login from './login';


const Hero = (props,{handleLogout}) => {

    const[click, setClick] = useState(false); 
    const[button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () =>{
        if(window.innerWidth <= 960){
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect( () => {
        showButton();
    },[]);

    window.addEventListener('resize', showButton);

    const handleBack = () => {
        props.history.push('/home');
    }

    return (
        <section className="hero">
            <Router>
            <nav className="navbar">
                <div className="navbar-container">
                    
                    <h2> Welcome to NOKIA Smart Parking System</h2>
                   <div className="menu-icon" onClick={handleClick}>
                       <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                   </div>
                   <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                       <li className='nav-item'>
                           <Link to='/home' className='nav-links' onClick={closeMobileMenu}>
                               Home
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <Link to='/parking-map' className='nav-links' onClick={closeMobileMenu}>
                               Parking map
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <Link to='/feedback2' className='nav-links' onClick={closeMobileMenu} >
                               Feedback
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <Link to='/analitycs' className='nav-links' onClick={closeMobileMenu}>
                               Analytics
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <Link to='/configurations' className='nav-links' onClick={closeMobileMenu}>
                               Configurations
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <Link to='/users' className='nav-links' onClick={closeMobileMenu}>
                               Users
                           </Link>
                       </li>
                       <li className='nav-item'>
                           <Link  className='nav-links' onClick={closeMobileMenu}>
                               <NavDropdown >
                                   <StartInstance onClick={handleBack}/>
                               </NavDropdown>
                             Start Instance
                           </Link>
                           
                       </li>
                       <li className='nav-item'>
                           { !button && <Link to='/logout' className='nav-links' onClick={handleLogout}>
                               Logout
                           </Link>
                           }
                       </li>

                   </ul>
                   { button && <Button onClick={handleLogout} buttonStyle='btn--outline'>Logout</Button> }
                </div>
                
            </nav>



      <Switch>
        <Route path='/home' exact component={Home}/>
        <Route path='/users' exact component={Users}/>
        <Route path='/parking-map' exact component={ParkingMap}/>
        <Route path='/feedback2' exact component={Feedback2}/> 
        <Route path='/configurations' exact component={Configurations}/>
        <Route path='/analitycs' exact component={Analitycs}/>
        <Route path='/logout' exact component={Logout}/>
        <Route path='/addConfiguration' exact component={AddConfiguration}/>
        <Route path='/updateConfiguration' exact component={UpdateConfiguration}/>
        <Route path='/viewStream' exact component={ViewStream}/>
        <Route path='/login' exact component={Login}/>
        
      </Switch>
          </Router>
        </section>
    );
}

export default Hero;