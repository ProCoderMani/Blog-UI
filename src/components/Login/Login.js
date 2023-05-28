import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

 useEffect(()=>{
  const identifier = setTimeout(()=>{         
    // use predefined settimeout to improve (decrease no.)https requests.
    console.log('Checking Form validity')
    setFormIsValid(
      enteredEmail.trim().length >=6 && enteredPassword.trim().length >= 6
    );
  }, 500)
    return () => {
    clearTimeout(identifier);
    }
 },[enteredEmail, enteredPassword])

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.trim().length >= 6);
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length >= 6);
  };

  const submitHandler =(e)=>{
    e.preventDefault();
    console.log({enteredEmail,enteredPassword});
      const user =  {
        usernameOrEmail: enteredEmail,
        password: enteredPassword
      };
    axios.post('http://localhost:8999/api/auth/login',user)
      .then((response)=>{
        console.log(response.data);
        sessionStorage.setItem('token',response.data.accessToken);
        props.onLogin(enteredEmail);
      })
      .catch((error)=>{
        console.log('error',error.response.data.message);
      }
  )}

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <h2>Welcome back!</h2>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="text"
            id="email"
            placeholder='Enter your email address'
            value={enteredEmail}
            onChange={(e)=>setEnteredEmail(e.target.value)}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder='Type your password'
            value={enteredPassword}
            onChange={(e)=>setEnteredPassword(e.target.value)}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
      Create account
    </Card>
  );
};

export default Login;
