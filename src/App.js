import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Registeration from './components/Login/Registeration';

import MainHeader from './components/MainHeader/MainHeader';

import MainFooter from './components/MainFooter/MainFooter';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const storeuserLoggedInformation = sessionStorage.getItem('token')
    const user = sessionStorage.getItem('userId') 
    if (storeuserLoggedInformation && user) {
      setIsLoggedIn(true);
    }
  }, []);


  const loginHandler = (email) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    if(sessionStorage.getItem != null && email){ 
    setIsLoggedIn(true)
    sessionStorage.setItem('userId', email)
    }
  };

  const logoutHandler = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('userId')

    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {/* <Registeration/> */}
        
      </main>

      <MainFooter/>
    </React.Fragment>
  );
}

export default App;
