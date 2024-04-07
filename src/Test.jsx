import './App.css'
import { useGoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  const [userName, setUserName] = useState('');
  
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          },
        });
        // Assuming the response contains user's name
        const { name } = res.data;
        setUserName(name);
      } catch (err) {
        console.log(err);
      }
    }
  });

  const handleGoogleSignIn = (event) => {
    event.preventDefault(); // Prevent default form submission
    login(); // Trigger Google Sign-In
  };

  return (
    <>
      <div className='container w-50 border shadow mt-5 p-5'>
        <Form>
          <h1 className='text-center'>Sign In</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="primary" onClick={handleGoogleSignIn}>Sign in with Google 🚀</Button>
        </Form>
      </div>
      {userName && <div className="mt-3 text-center">Welcome, {userName}!</div>}
    </>
  );
}

export default App;
