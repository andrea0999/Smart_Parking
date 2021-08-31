import React, {useState, useEffect} from 'react';
import './css/addConfiguration.css';
import axios from 'axios';


function UpdateConfiguration(props) {
    
    const [state, setStateInfo] = useState();
    const [camName, setCamName] = useState();
    const [camIp, setCamIp] = useState();
    const [fleg, setFleg] = useState();
    const [ipV4Host, setIpV4Host] = useState();
    

    const [stateNew, setStateInfoNew] = useState();
    const [camNameNew, setCamNameNew] = useState();
    const [camIpNew, setCamIpNew] = useState();
    const [flegNew, setFlegNew] = useState();
    const [ipV4HostNew, setIpV4HostNew] = useState();

    
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

    const handleSubmit = () => {

    const data = {stateNew,camNameNew,camIpNew,flegNew,ipV4HostNew};
        fetch('http://92.87.91.43:4000/cplanes_update_1', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
    }).then( () => {
        setConfigurationsData(
            configurationsData.map( (val) => {
                const configMod = {
                    state: val.state,
                    camName: val.camName,
                    camIp: val.camIp,
                    configuration: val.configuration,
                    ipV4Host: val.ipV4Host,
                    fleg: val.fleg
                }
                return configMod;
            })
        );
        console.log('updated');
    })
        props.history.push('/configurations');
        
    }

    
    return(
        
        <div>
            
            <br/><h1 style={{color: '#fff', textAlign: 'center'}}>Update Configuration</h1>
            
            <form className='xxx'> 
            
                <input 
                    type= 'text'
                    placeholder={global.stateSend}
                    required
                    value={state}
                    onChange={ (e) => setStateInfoNew(e.target.value)}
                />

            
                <input 
                    type= 'text'
                    placeholder={global.camNameSend}
                    required
                    value={camName}
                    onChange={ (e) => setCamNameNew(e.target.value)}
                />

                
                <input 
                    type= 'text'
                    placeholder={global.camIpSendAdd}
                    required
                    value={camIp}
                    onChange={ (e) => setCamIpNew(e.target.value)}
                />
                
                <input 
                    type= 'text'
                    placeholder={global.ipV4HostSend }
                    required
                    value={ipV4Host}
                    onChange={ (e) => setIpV4HostNew(e.target.value)}
                />   

                <input 
                    type= 'text'
                    placeholder={global.FlegSend}
                    required
                    value={fleg}
                    onChange={ (e) => setFlegNew(e.target.value)}
                /> 

                <button className="button-style" onClick={handleSubmit}>Update</button>
               
            </form>
            
        </div>
        
        
    );
}

export default UpdateConfiguration;