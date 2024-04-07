import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FloatingLabel, Form } from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Home from './Home';


function Auth({ insideRegister }) {
  const navigate = useNavigate()

  const [userName, setUserName] = useState('');

  //state to store user creating datas
  const [userInputs, setUserInputs] = useState({
    username: "", email: "", password: ""
  })
  console.log(userInputs);

//   google auth
const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          },

        })
        const { name } = res.data;
        setUserName(name);

        console.log("Hello",res);
        // navigate('/home')
      } catch (err) {
        console.log(err);
      }
    }
  });

  const handleGoogleSignIn = (event) => {
    event.preventDefault(); // Prevent default form submission
    login(); // Trigger Google Sign-In
  };

  const handleLogin=(e)=>{
    e.preventDefault()
    if(userInputs.email && userInputs.password){
        toast.success('Login success')
    }else{
        toast.error('Please fill the form')
    }
  }

  return (
    <>
      <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
        <div className="container w-75">
          <div className="card shadow p-5">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <img className='w-100' src="https://cdn.dribbble.com/users/806947/screenshots/4698193/drink_coffee-resize.gif" alt="Auth" style={{borderRadius:'20%'}}/>
              </div>
              <div className="col-lg-6">
                <h1 className="fw-bolder mt-2">
                  Sign {insideRegister ? 'up' : 'in'} to your Account
                </h1>
                <Form>
                  {/* for new registers we use props  */}
                  {
                    insideRegister &&
                    <FloatingLabel
                      controlId="floatingInputName"
                      label="Username"
                      className="mb-3"
                    >
                      <Form.Control value={userInputs.username} onChange={e => setUserInputs({ ...userInputs, username: e.target.value })} type="text" placeholder="Username" />
                    </FloatingLabel>

                  }
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email address"
                    className="mb-3"
                  >
                    <Form.Control value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} type="email" placeholder="name@example.com" />
                  </FloatingLabel>
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} type="password" placeholder="Password" />
                  </FloatingLabel>

                  {
                    insideRegister ?
                      <div className='mt-3'>
                        <button  className='btn btn-primary mb-2'>REGISTER</button>
                        <p>Already have an account? Click here to <Link to={'/'}>Login</Link></p>
                        <Button variant="primary" onClick={handleGoogleSignIn}>Sign in with Google 🚀</Button>

                      </div>
                      :
                      <div className='mt-3'>
                        <button onClick={handleLogin} className='btn btn-primary mb-2'>LOGIN</button>
                        <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                        <Button variant="primary" onClick={handleGoogleSignIn}>Sign in with Google 
                        <img src="https://i.postimg.cc/7hTSYK3b/g-removebg-preview.png" alt="" style={{width:'30px',height:'30px'}} className='ms-3'/></Button>
                      </div>
                  }
                </Form>
                {userName && <h1 className="mt-3 text-center text-danger">Welcome, {userName}!</h1>}
                {/* {userName && <Home userName={userName} />} Pass userName as prop */}

              </div>
            </div>
          </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </div>
    </>
  )
}

export default Auth