import React, {useState} from 'react';
import './css/addConfiguration.css';

function AddConfiguration(props) {
    
    const [cplaneId, setCplaneId] = useState();
    const [state, setStateInfo] = useState();
    const [camName, setCamName] = useState();
    const [camIp, setCamIp] = useState();
    const [configuration, setConfiguration] = useState();
    const [ipV4Host, setIpV4Host] = useState();
    const [fleg, setFleg] = useState();
    const [scheduledForUpdate, setScheduledForUpdate] = useState();
    const [scheduledForRefresh, setScheduledForRefresh] = useState(true);
    const [config, setConfigurationsData] = useState([]);

    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {cplaneId,state,camName,camIp,configuration,ipV4Host,fleg,scheduledForUpdate,scheduledForRefresh};
        
        setIsPending(true);

        fetch('http://92.87.91.43:4000/cplanes_new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then( () => {
            setConfigurationsData(
                config.map( (val) => {
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
            console.log(data)
            console.log('added');
        })

        props.history.push('/configurations');
        
    }

    return(
        <div>
            <br/><h1 style={{color: '#fff', textAlign: 'center'}}>Add a new configuration</h1>

            <form className='xxx'> 
                
                <input 
                    type= 'text'
                    placeholder='Cam State'
                    required
                    value={state}
                    onChange={ (e) => setStateInfo(e.target.value)}
                />

            
                <input 
                    type= 'text'
                    placeholder='Cam Name'
                    required
                    value={camName}
                    onChange={ (e) => setCamName(e.target.value)}
                />

                
                <input 
                    type= 'text'
                    placeholder='Cam IP'
                    required
                    value={camIp}
                    onChange={ (e) => setCamIp(e.target.value)}
                />

                
                <input 
                    type= 'text'
                    placeholder='Configuration'
                    required
                    value={configuration}
                    onChange={ (e) => setConfiguration(e.target.value)}
                /> 

                
                <input 
                    type= 'text'
                    placeholder='Conection adress'
                    required
                    value={ipV4Host}
                    onChange={ (e) => setIpV4Host(e.target.value)}
                />

                <input 
                    type= 'text'
                    placeholder='Plate/Web'
                    required
                    value={fleg}
                    onChange={ (e) => setFleg(e.target.value)}
                />    

                

                { !isPending && <button className="button-style" onClick={handleSubmit}>Add Data</button>}
                { isPending && <button disabled>Loading</button>}
            </form>
        </div>
    );
}

export default AddConfiguration;