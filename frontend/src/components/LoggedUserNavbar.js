import React, { useEffect, useState } from 'react';
import {handleSuccess} from "../utils";
import "./LoggedUserNavbarStyles.css";
import { useNavigate } from 'react-router-dom';


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
   <div className='shared-background'>
   <nav className='user-navbar '>

   <h1 className='user-navbar-logo'>Tripper</h1>

   <button className='logout-btn' onClick={handleLogout}>Log Out</button>

   </nav>

   <div className="welcome-card-shared-background">
    
    <p className="welcome-para">
      <h2 className='username-card'>Hi, {loggedInUser}! </h2>
    <br></br>
       We're thrilled to have you on board with Tripper. As you embark on your journey, we're here to help you make the most of your travel experiences. Lets make your trip smooth and hassle free.  </p>
</div>

</div>   
   
   </>

  )
}

export default LoggedUserNavbar

