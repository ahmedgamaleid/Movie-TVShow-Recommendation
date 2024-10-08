import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Joi from 'joi';
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [apimsg, setMsg] = useState('');
  const [errordetails, seterrors] = useState([]);
let  redirect = useNavigate();
  // Function to validate user data
  function validateUserData() {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      password: Joi.string()
        .pattern(new RegExp(/^[A-Z]/))
        .required()
    });

    const validation = schema.validate(user, { abortEarly: false });
    if (validation.error) {
      seterrors(validation.error.details);
      return false;
    } else {
      seterrors([]);
      return true;
    }
  }

  // Function to handle login
  async function login() {
    if (validateUserData()) {
      try {
        const response = await axios.post('https://movies-api.routemisr.com/signin', user);
        const { data } = response;
        setMsg(data.message);
        console.log(data)
        if (data.message === 'success') {
          localStorage.setItem('token',data.token)
          props.setislogin(true); 
          // Redirect or perform any action upon successful login
          redirect('/Home')
        }
      } catch (error) {
        console.error('Login error:', error);
        // Handle login error
      }
    }
  }

  // Function to display validation errors
  function showalert(inputName) {
    const error = errordetails.find(err => err.path[0] === inputName);
    if (error) {
      return <p className='text-danger'>{error.message}</p>;
    } else {
      return null;
    }
  }

  // useEffect to log user data changes
  useEffect(() => {
    console.log('User data has been updated:', user);
  }, [user]);

  return (
    <div className='container '>
     





     <div className='row p-4  d-flex justify-content-center align-content-center'>
      {/* <h1>Login Form</h1> */}
      
        <form onSubmit={(e) => { e.preventDefault(); login(); }}>
    
          <label className=''>Email</label>
          <input
            type='text'
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className='form-control   '
          />
          {errordetails.length > 0 ? showalert('email') : ''}
          <label className='py-1'>Password</label>
          <input
            type='password'
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className='form-control   '
          />
          {errordetails.length > 0 ? showalert('password') : ''}
          <button type='submit' className='btn text-bg-danger rounded-5 px-4 mt-2'>Login</button>
          <h1 className='bg-danger'>{apimsg}</h1>
          
          
        </form>
     
    
      
    </div>
      
    </div>
  ); 
}

export default Login;
