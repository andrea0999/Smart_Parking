import React, {useEffect, useState} from 'react';
import '../../App.css';
import { Card } from "react-bootstrap";
import './css/box.css';

import axios from 'axios';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import { Modal, Button} from 'react-bootstrap';

global.camIpSend = "";

global.stateSend = "";
global.camNameSend = "";
global.camIpSendAdd = "";
global.ipV4HostSend = "";
global.FlegSend = "";

function Configurations(props) {

  const [configurationsData, setConfigurationsData] = useState([]);  
  
  useEffect( () => {

    axios
        .get('http://92.87.91.43:4000/cplanes' )
        .then( res => {
          //console.log(res)
          setConfigurationsData(res.data)
        })
        .catch( err => {
          alert(err)
        })
  
  }, []);

  

  const handleNewConfiguration = () => {
      props.history.push('/addConfiguration');
  }

  const handleViewStream = (stream) => {    
      console.log(stream);
      global.camIpSend = stream;
      console.log(global.camIpSend);
      props.history.push('/viewStream');

  }

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => { setShow(false)
                                console.log('cevaaaa handle close')
                                console.log(show)
                            }
  const handleShow = () => { setShow(true)
    console.log('cevaaaa handle show')
    console.log(show)
  }
  

  const toggleTrueFalse = () => {
    setShowModal(handleShow);
      
    }

    const handleUpdate = (name, ip, ipv4, state, fleg) => {
      global.stateSend = state;
      global.camNameSend = name;
      global.camIpSendAdd = ip;
      global.ipV4HostSend = ipv4;
      global.FlegSend = fleg;

      props.history.push('/updateConfiguration');
    }

    const handleDelete = (data) => {
          
          console.log(data)
          alert('Deleted Camera!')
          axios
            .get(`http://92.87.91.43:4000/cplanes/delete/${data}`)
            .then( (res) => {
              setConfigurationsData(
                configurationsData.map( (val) => {
                      const configMod = {
                          state: val.state,
                          camName: val.camName,
                          camIp: val.camIp,
                          configuration: val.configuration,
                          ipV4Host: val.ipV4Host,
                      }
                      return configMod;
                  })
              );
              console.log(res)
              
            })
            .catch( err => {
              alert(err)
            })

          
    }

    const handleDetails = () => {
      setShowModal(handleShow);
    }
    

        return (
          
            
          <div className='grid' > 
            <Router>
            {configurationsData.map((data) => (
                      <Card style={{ width: "18rem", background: '#fff' }} 
                            className="box"
                            key={data.cplaneId}
                      >
                       <Card.Body>
                         <Card.Title className='title-style' style={{textAlign: 'center'}}>{data.camName}</Card.Title>
                         <Card.Text>State: {data.state}</Card.Text>
                         <Card.Text> 
                         <Link onClick = {() => handleViewStream(data.camIp)}  >
                                IP: {data.camIp}
                          </Link>  
                         </Card.Text>
                         <Card.Text > HostName Adress:  {data.ipV4Host} </Card.Text>
                         <Card.Text > Start instance for:  {data.fleg} </Card.Text>
                       </Card.Body>
                       <Card.Footer>
                         <button className="updateStyle" onClick={() => handleUpdate(data.camName, data.camIp, data.ipV4Host, data.state, data.fleg)} >Update</button>
                         <button className="deleteStyle" onClick={() => {handleDelete(data.camName)}}>Delete</button>
                         <button className="viewDetailsStyle" onClick={handleDetails}>Details</button>

                         {show ?
        
        
        <Modal show={show} onHiden={handleClose}>
        <Modal.Header >
          <Modal.Title> {data.camName} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>Details</h2>
          <ul>
            <ol>State: {data.state}</ol>
            <ol>Cam Address: {data.camIp}</ol>
            <ol>HostName Address: {data.ipV4Host}</ol>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>  : null
         
     }

                       </Card.Footer>
                       </Card>     
                       
                       
               ))}
            
      </Router>

      <button className='button-styleC' onClick={handleNewConfiguration}>New Configuration</button>
          </div>
          
        
        );
}

export default Configurations;