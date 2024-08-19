import React, { useEffect, useState } from 'react';
import {handleSuccess} from "../utils";
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";

function UserFunctionalityNavbar() {

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
 
   </>
  )
}

export default UserFunctionalityNavbar
