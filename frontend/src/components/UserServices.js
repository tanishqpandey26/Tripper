import React from 'react';
import "./UserServicesStyles.css";
import Calculator from "../assets/calculator.png";
import Createiti from "../assets/createitinerary.png";
import Shareiti from "../assets/shareitinerary.png";
import Shareexp from "../assets/shareexperience.png";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from 'react-router-dom';

function UserServices() {
  return (

   <>

   <div class="user-service-container">
    
    
  <div class="user-service-card">
    <div className='create-itinerary'>
   <Link to="/createitinerarypage"><IoMdAddCircle/> </Link>
    <h3>Create Itinerary</h3>
    <p>Plan and organize your trips efficiently with our tools.</p>
    <img alt='create' src={Createiti}></img>
    </div>
  </div>

  <div class="user-service-card">
    <div className='share-itinerary'>
    <Link to="/shareitinerarypage"><IoMdAddCircle/> </Link>
    <h3>Share Itinerary</h3>
    <p>Easily share your travel itinerary with friends and family.</p>
    <img alt='share' src={Shareiti}></img>
    </div>
  </div>

  <div class="user-service-card">
    <div className='track-expenses'>
    <Link to="/trackexpensespage"><IoMdAddCircle/> </Link>
    <h3>Track Expenses</h3>
    <p>Keep track of expenses! </p>
    <img alt='expenses' src={ Calculator}></img>
  </div>
  </div>

  <div class="user-service-card">
    <div className='share-exp'>
    <Link to="/shareexperiences"><IoMdAddCircle/> </Link>
    <h3>Share Your Experiences</h3>
    <p>Read and share authentic travel experiences from real travelers. </p>
    <img alt='experience' src={Shareexp}></img>
    </div>
  </div>

 
  </div>

   </>

  )
}

export default UserServices;
