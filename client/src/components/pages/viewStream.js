import React from 'react';
import ReactPlayer from 'react-player';

import './configurations';
import './css/stream.css';

function ViewStream(props) {


    const handleBack = () => {
        props.history.push('/configurations');
    }

    return(
        <div className='alignStream'>
            <br/><h1 style={{color: '#fff', textAlign: 'center'}}>View Stream</h1>

            
                     
                    {console.log(global.camIpSend)}      
                    
                {  global.camIpSend.startsWith("http") ?
                                    
                    ReactPlayer.canPlay(global.camIpSend)  :
                                          
                        <ReactPlayer      
                            url='http://localhost:4000/index.m3u8' 
                            playing={true}
    
                        />
                }
            
             

            <button className="button-style" onClick={handleBack}>Back</button>
               
        </div>
    );
}

export default ViewStream;