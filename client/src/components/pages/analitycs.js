import React,{useState, useEffect} from 'react';
import '../../App.css';
import axios from 'axios';

export default function Analitycs() {

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
                  console.log(response)
                  //console.log(xxx.camName)
                  //setCmd(response.config.url)
                  console.log(response.config.url)
                  setArray(oldArray => [...oldArray,response.config.url] );
                 
                })
                .catch( err => {
                  alert(err)
                })
                
                
            ))

      }, []);


    return(
        <div>
            <br/>
            {array.map( (data) => (
                <ul>
                    <li style={{color: '#fff'}}>
                        <a href={data} target="_blank">{data}</a>
                       
                    </li>
                </ul>
                ))}
            <button >Start</button>
            <br/>
        </div>
    );
    

}