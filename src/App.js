
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [registered,setRegistered]=useState(false)
  const [error, setError] = useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
  const handleEmailBlur = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value)
  }
  const handleRegisteredChange=(event) => {
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {   
      event.stopPropagation();
      return;
    }
    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError('Password Should contain at least one special character');
      return;
    }
    setValidated(true);
    setError('');

    if (registered) {
      
    }
    else {
      createUserWithEmailAndPassword(auth,email,password)
      .then(result => {
        const user = result.user;
        console.log(user)
        setEmail('')
        setPassword('')
    })
      .catch(error => {
        console.error(error)
        setError(error.message)
    })
    }

    
    event.preventDefault()
  }
  return (
    <div>
      <div className="registration w-50 mx-auto">
        <h2 className='text-primary mt-5'>Please {registered? 'Login': "Register"}!!</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
    <Form.Control.Feedback type="invalid">
        Please provide a valid Email.
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required/>
    <Form.Control.Feedback type="invalid">
        Please provide a valid Password.
    </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already Registered?" />
          </Form.Group>
          <p className='text-danger'>{ error}</p>
  <Button variant="primary" type="submit">
    {registered? "Login": "Register"}
  </Button>
</Form>
      </div>
    </div>
  );
}

export default App;
