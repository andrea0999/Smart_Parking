import React from 'react';
import { Card } from 'react-bootstrap';
import '../../App.css';
import Feedback from './feedback';
import ScrollToTop from './scrollToTop';
import {Scrollbars} from 'react-custom-scrollbars';
   

class Feedback2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          userFeedback: [],
        };

       
      }
      // get method
      componentDidMount() {
        fetch('http://92.87.91.43:4000/feedback')
          .then(response => response.json())
          .then(result => this.setState({ userFeedback: result }));
      }


    render() {
    

        return (
          
          <div className='Feedback'>
            <br /> <br/>
            <h1 style={{textAlign: 'center', color: '#fff'}}>FEEDBACK</h1>
            <br/> <br/> 
            <div className='row no-gutters'>
              <div className='col-md-6 no-gutters'>
                <div className='leftside'> <Feedback /></div>
              </div>

              <div className='col-md-6 no-gutters'>
                  <div className='rightside'> 
                   
                  <Scrollbars>
                  {this.state.userFeedback.map((data) => (
                       <Card key={data.email} className="alignPosition">
                         <Card.Body>
                           <Card.Title style={{fontStyle: 'bold'}}>  {data.user_email} </Card.Title>
                             <Card.Text> {data.msg}</Card.Text>
                         </Card.Body>
                        
                       </Card>
                  ))}
                  <ScrollToTop />
                   </Scrollbars>
                  </div>
              </div>

            </div>
            
          </div>

        );
    }


}

export default Feedback2;