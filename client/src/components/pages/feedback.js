import React, {useState} from 'react';
import '../../App.css';
import { FaStar } from "react-icons/fa";
import './css/feedback.css';
//import { useOktaAuth } from "@okta/okta-react";
import { Modal, Button} from 'react-bootstrap';

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
    
};

const Feedback = (props) => {

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState('');

    //const { authState, oktaAuth } = useOktaAuth();
    //const [userInfo, setUserInfo] = useState();
    
  
    const handleClick = value => {
      setCurrentValue(value)
    }
  
    const handleMouseOver = newHoverValue => {
      setHoverValue(newHoverValue)
    };
  
    const handleMouseLeave = () => {
      setHoverValue(undefined)
    }

    /*useEffect(() => {
      if (!authState.isAuthenticated) {
        // When user isn't authenticated, forget any user info
        setUserInfo(null);
      } else {
        oktaAuth.getUserInfo().then(info => {
          setUserInfo(info);
        });
      }
    }, [authState, oktaAuth]);

    const retrievEmail = () => {
      setEmail(userInfo.email);
    }*/

  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [valueTextArea, setValueTextArea] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleClose = (e) => { setShow(false)
    console.log('cevaaaa handle close')
    console.log(show)


    e.preventDefault();
      //retrievEmail();
      const data = {inputValue, valueTextArea};

      fetch('http://92.87.91.43:4000/postFeedback', {
          method: 'POST',
          mode: 'no-cors',
          headers: {'Content-Type': 'application/json',
                    'Accept' : 'aplication/json', 
                   },
          body: JSON.stringify(data)
      }).then( () => {
          console.log('feedback added ');
      })

      console.log(data.inputValue);
      console.log(data.valueTextArea);

      //props.history.push('/feedback2');
      setValueTextArea('');
      setInputValue('');
      
  }
  const handleShow = () => { setShow(true)
    console.log('cevaaaa handle show')
    console.log(show)
  }

    const handleSubmit = () => {
      setShowModal(handleShow);
    }

    const handleInput = (e) => {
      setInputValue(e.target.value);
    };

    const handleTextArea = (e) => {
      setValueTextArea(e.target.value);
    };

  return (
    <div>
    <div style={styles.container}>
      
      <br/>
      <textarea
        placeholder="What's your experience?"
        style={styles.textarea}
        value={valueTextArea}
        onChange={ handleTextArea}
        //onChange={getData}
      />

      <button style={styles.button}  onClick= { handleSubmit}>
        Submit
      </button>
      
      {show ? <Modal show={show} onHiden={handleClose} >
          <Modal.Body >
            <form><input 
                    type= 'text'
                    placeholder='Your email'
                    required
                    value={inputValue}
                    onChange={ handleInput}
                />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="reset" variant='secondary' onClick={handleClose}>
               Close
            </Button>
          </Modal.Footer>
        </Modal>  : null}
    </div>

    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  textarea: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    padding: 10,
    margin: "20px 0",
    minHeight: 300,
    width: 700,
    
  },
  button: {
    border: "1px solid #a9a9a9",
    borderRadius: 5,
    width: 200,
    padding: 10,
  },
  showFeedback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "right"
  }

};


 export default Feedback;

