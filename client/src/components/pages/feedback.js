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

const Feedback = () => {

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

  const handleClose = (e) => { setShow(false)
    console.log('cevaaaa handle close')
    console.log(show)


    e.preventDefault();
      //retrievEmail();
      const data = {email, msg};

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

      console.log(data.msg);
      console.log(data.email);
      
  }
  const handleShow = () => { setShow(true)
    console.log('cevaaaa handle show')
    console.log(show)
  }

    const handleSubmit = () => {
      setShowModal(handleShow);
    }


  return (
    <div>
    <div style={styles.container}>
      
      <div style={styles.stars}>
        {stars.map((_, index) => {
          return (
            <FaStar
              key={index}
              size={24}
              onClick={() => handleClick(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
              color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
              style={{
                marginRight: 10,
                cursor: "pointer"
              }}
            />
          )
        })}
      </div>
      <br/>
      <textarea
        placeholder="What's your experience?"
        style={styles.textarea}
        value={msg}
        onChange={ (e) => setMsg(e.target.value)}
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
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
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

