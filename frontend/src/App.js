import './App.css';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import { useState, useEffect } from 'react';
import Register from './pages/Register'
import appLogo from './images/nyankoapp.png'
import UserContext from './pages/UserContext';
import axios from 'axios';
import Login from './pages/Login';


function App() {

  const [email, setEmail] = useState('');
  useEffect(() => {
    axios.get('http://localhost:4000/user').then(response => {
      setEmail(response.data.email);
    })
  }, [])

  function logout() {
    axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
      .then(() => setEmail(''));
  }



  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <>
          <main>
            {/* logo */}
            <div className="appLogo-container">
              <img className="appLogo" src={appLogo} alt="nyanko-sensei" />
            </div>

            <div className='logged-in'>
              {!!email && (
                <div>
                  Logged in as {email}
                </div>
              )}

              {!email && (
                <div> not logged in, please log in or register</div>
              )

              }
            </div>

            {/* login register */}
            <div className='link-div'>
              <Link to={'/login'}>Login</Link>
              <Link to={'/register'}>Register</Link>
            </div>
          </main>
        </>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>

      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
