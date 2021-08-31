import React,{useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios';

export default function StartInstance(props) {

//const [cmd, setCmd] = useState([]);
const [configuration, setConfigurationsData] =useState([]);
const [array,setArray] = useState([]);

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

            configuration.map((configure) => (
                
                axios
                .get('http://92.87.91.43:4000/exec_command/' + configure.camName)
                .then( response => {
                  //console.log(response)                  
                  console.log(response.config.url)
                  setArray(oldArray => [...oldArray,response.config.url] );
                 
                })
                .catch( err => {
                  alert(err)
                })
                
                
            ))

      }, []);

      const handleAlert = () => {
        alert("Instance open")
        //props.history.push('/home');
      }
    return(
        <div>           
            {array.map( (data) => (
                <ul>
                    <li style={{color: '#fff'}} >
                        <a href={data} target="_blank" onClick={handleAlert}>{data}</a>
                       
                    </li>
                </ul>
                ))}
            
            
        </div>
    );
    

}