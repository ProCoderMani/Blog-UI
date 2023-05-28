import React, { useState } from 'react';
import axios from 'axios';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Registeration = () => {

    const [name, setName] = useState();
    const [userName, setUserName] = useState();
    const [email ,setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmit =(e)=>{
            e.preventDefault();
            console.log({name,userName,email,password});
        const user =  {
            name: name,
            username: userName,
            email: email,
            password: password
        };

        axios.post('http://localhost:8999/api/auth/register',user)
        .then((response)=>{
        console.log(response.data)
        window.alert(response.data)
    })
        .catch((error)=>{
        console.log('error',error.response.data.message);
        window.alert(error.response.data.message);}
        )
    }

   return (
    <Card className={classes.login}>
      <form onSubmit={onSubmit}>
        <div className={`${classes.control} `} >
          <label htmlFor="name">Full Name</label>
          <input
            type='text'
            id='fullname'
            placeholder='Enter your full name...'
            onChange={(e)=> setName(e.target.value)}
          />
        </div>
        <div className={`${classes.control} `} >
          <label htmlFor="username">UserName</label>
          <input
            type='text'
            id='username'
            placeholder='username... '
            onChange={(e)=> setUserName(e.target.value)}
          />
        </div>
        <div className={`${classes.control} `} >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            placeholder='email address...'
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
        <div
          className={`${classes.control} `}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder='type your password'
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Create Account
          </Button>
        </div>
      </form>
    </Card>
  );
}


export default Registeration