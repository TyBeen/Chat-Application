import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Auth from './components/Auth'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard';
import './App.css'

function App() {
  //login & register links state variable for hiding after login
  const [isLinksShowing, setLinksHidden] = useState(true);

  //setting user data object from localStorage to state variable
  const _id = localStorage.getItem("_id");
  const username = localStorage.getItem("username");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("isAdmin");

  const newData = {
    _id: _id,
    username: username,
    firstName: firstName,
    lastName: lastName,
    email: email,
    isAdmin: isAdmin
  }

  //user info object
  const [ userData, setUserData ] = useState({});
  useEffect(() => {
    updateUser()
  }, []);

  //function updates user info
  function updateUser () {
    setUserData(newData);
  }

  //function clears user info
  function clearUser() {
    setUserData(" ");
    localStorage.removeItem("token");
  }

  return (
    <>
    <div className='body'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth isLinksShowing={isLinksShowing} />}>
            <Route path='/login' element={<Login updateUser={updateUser} setLinksHidden={setLinksHidden} />} />
            <Route path='/register' element={<Register />}/>
            <Route path = '/dashboard' element = {<Dashboard clearUser={clearUser} userData={userData} setLinksHidden={setLinksHidden}/>} />
          </Route>
          <Route path="*" element={<Navigate to='dashboard' />} />
        </Routes>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
