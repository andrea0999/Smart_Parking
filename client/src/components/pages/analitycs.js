import React,{useState, useEffect, PureComponent} from 'react';
import '../../App.css';
import axios from 'axios';
import { Card } from "react-bootstrap";
import './css/analitycs.css';

import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";

export default function Analitycs() {

//const [cmd, setCmd] = useState([]);
const [configuration, setConfigurationsData] =useState([]);
const [array,setArray] = useState([]);

    useEffect( () => {
       

         axios 
            .get('http://92.87.91.43:4000/get_overview' )
            .then( res => {
              console.log(res)
              setConfigurationsData(res.data)
            })
            .catch( err => {
              alert(err)
            })

      }, []);


      /*const state = {
        labels: ['Online', 'Blocked', 'Offline'],
        database: [
          {
            label: 'Rainfall',
            backgroundColor: [
                'green',
                'red',
                'orange'
            ],
            borderColor: 'rgba(0, 0, 0, 1',
            borderWidth: 2,
            data: [1, 2, 0]
          }
        ]
      }
      
      const options = {
       Plugins: {
          Legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            text: 'Average Rainfall per month',
            display: true,
            fontSize: 20
          }
        }
      }*/
     
      const data = [
        { name: 'Online', value: configuration.occupied },
        { name: 'Offline', value: configuration.available },
        { name: 'Blocked', value: configuration.blocked },
      ]
      const COLORS = ['green', 'red', 'orange'];

    return(
      <div style={{ textAlign: "center", color: '#fff' }}>
      <br/>
      <h1>Current video instance status</h1>
      <div > 
        <br/>
        
        <Card.Body className='cardAnalitycs'>
        <PieChart width={400} height={400} >
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          
          <Tooltip />

          <BarChart/>
          <Legend />
        </PieChart>
        
        </Card.Body>
      
        </div>
        </div>
    );
    

}




function App() {
  return (
    <div className="wrapper">
      <Card
        img="https://images.unsplash.com/photo-1612077330269-788066d5ba58?crop=entropy&cs=srgb&fm=jpg&ixid=MXwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHw&ixlib=rb-1.2.1&q=85"
        title="Tie Up Boots"
        description="Fall Favorite • Boots"
        price="45.00"
      />
    </div>
  );
}




