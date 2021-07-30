import React, {useEffect, useState} from 'react';
import '../../App.css';
import { Card } from "react-bootstrap";
import './css/box.css';

import axios from 'axios';
import ReactPlayer from 'react-player';

import {Link} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import { Modal, Button} from 'react-bootstrap';

import { spawn } from 'child_process';


function Configurations(props) {

  const [configurationsData, setConfigurationsData] = useState([]);

  //const [image, setImage] = useState();

  useEffect( () => {
    axios
        .get('http://92.87.91.43:4000/cplanes' )
        .then( res => {
          console.log(res)
          setConfigurationsData(res.data)
        })
        .catch( err => {
          alert(err)
        })
  
  }, []);

  

  const handleNewConfiguration = () => {
      props.history.push('/addConfiguration');
  }
  
  const handleStartRtsp = () => {

    <ReactPlayer
      url='http://localhost:4000/index.m3u8' 
      playing={true}
      
    />              

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
  

    //const {spawn} = require('child_process')
  const toggleTrueFalse = () => {
    setShowModal(handleShow);

    
        /*const child = spawn('ffmpeg', [ '-i', '{ip}', '-fflags', 'flush_packets', '-max_delay', '5','-flags', '-global_header', '-hls_time', '5', '-hls_list_size','3','-vcodec', 'copy', '-y', '.\server\videos\ipcam\index.m3u8'])
  
    child.stdout.on('data', (data) => {
      console.log({data})
    })*/
    
  };


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
                         <Link onClick = { toggleTrueFalse() }> 
                                IP: {data.camIp}
                          </Link>  

                          {show ? <Modal show={show} onHiden={handleClose} className='modal-wide'>

                                  <Modal.Body >
                                      <ReactPlayer 
                                          url='http://localhost:4000/index.m3u8' 
                                          playing={true}
      
                                      />
        
                                  </Modal.Body>
                                  <Modal.Footer>
                                      <Button variant='secondary' onClick={handleClose}>
                                                Close
                                      </Button>
                                  </Modal.Footer>
                                  </Modal>  : null }

                         </Card.Text>
                         <Card.Text > HostName Adress:  {data.ipV4Host} </Card.Text>
                       </Card.Body>
                           
                       </Card>          
               ))}
            
      </Router>

      <button className='button-styleC' onClick={handleNewConfiguration}>New Configuration</button>
          </div>
          
        
        );
}

export default Configurations;