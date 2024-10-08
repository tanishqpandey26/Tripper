import React, { useEffect, useState } from 'react';
import {handleSuccess} from "../utils";
import "./LoggedUserNavbarStyles.css";
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";


function LoggedUserNavbar() {

  const [loggedInUser, setLoggedInUser]=useState('');


  useEffect(()=>{
      setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const navigate = useNavigate();

    const handleLogout = (e)=>{
        
        localStorage.removeItem('token');

        localStorage.removeItem('loggedInUser');

        handleSuccess('User LoggedOut');

        setTimeout(()=>{
            navigate('/login')
        },1000)
    }


  return (

   <>
  
   <nav className='user-navbar '>

   <h1 className='user-navbar-logo'>Tripper</h1>

   <button className='logout-btn' onClick={handleLogout}><CiLogout /></button>

   </nav>

   <div className="welcome-card-shared-background">
    
    <p className="welcome-para">
      <h2 className='username-card'>Hi, {loggedInUser}! </h2>

       We're thrilled to have you on board with Tripper. As you embark on your journey, we're here to help you make the most of your travel experiences. Lets make your trip smooth and hassle free.  </p>
</div>

   
   </>

  )
}

export default LoggedUserNavbar

