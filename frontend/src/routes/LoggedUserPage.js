import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {handleSuccess,handleError} from "../utils";
import { ToastContainer } from 'react-toastify';

function LoggedUserPage() {

    const [loggedInUser, setLoggedInUser]=useState('');

    const navigate = useNavigate();


    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])

    const handleLogout = (e)=>{
        
        localStorage.removeItem('token');

        localStorage.removeItem('loggedInUser');

        handleSuccess('User LoggedOut');

        setTimeout(()=>{
            navigate('/login')
        },1000)
    }


  return (
    
    <div>

      <h1>welcome! {loggedInUser}</h1>

      <button onClick={handleLogout}>logout</button>

      <ToastContainer/>

    </div>

  )
}

export default LoggedUserPage;
