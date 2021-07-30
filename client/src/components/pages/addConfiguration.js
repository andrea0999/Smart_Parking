import React, {useState} from 'react';
import './css/addConfiguration.css';
//import Configurations from './configurations';


function AddConfiguration(props) {
    
    const [cplaneId, setCplaneId] = useState();
    const [state, setStateInfo] = useState();
    const [camName, setCamName] = useState();
    const [camIp, setCamIp] = useState();
    const [configuration, setConfiguration] = useState();
    const [ipV4Host, setIpV4Host] = useState();
    const [scheduledForUpdate, setScheduledForUpdate] = useState();
    const [scheduledForRefresh, setScheduledForRefresh] = useState(true);

    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {cplaneId,state,camName,camIp,configuration,ipV4Host,scheduledForUpdate,scheduledForRefresh};
        
        setIsPending(true);

        fetch('http://92.87.91.43:4000/cplanes_new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then( () => {
            console.log('added ');
            setIsPending(false);
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

                <select   className="select-style"
                    value={scheduledForUpdate}
                    onChange={ (e) => setScheduledForUpdate(e.target.value)}>
                    
                    <option value='true'>true</option>
                    <option value='false'>false</option>
                </select>

                { !isPending && <button className="button-style" onClick={handleSubmit}>Add Data</button>}
                { isPending && <button disabled>Loading</button>}
            </form>
        </div>
    );
}

export default AddConfiguration;