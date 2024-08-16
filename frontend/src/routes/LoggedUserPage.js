import React from 'react';
import { ToastContainer } from 'react-toastify';
import LoggedUserNavbar from '../components/LoggedUserNavbar';
import UserServices from '../components/UserServices';


function LoggedUserPage() {

    
  return (
    <>
    
   <LoggedUserNavbar/>

   <UserServices/>

   <ToastContainer/>
   </>

  )
}

export default LoggedUserPage;
