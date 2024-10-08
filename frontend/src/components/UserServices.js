import React from 'react';
import "./UserServicesStyles.css";
import Calculator from "../assets/calculator.png";
import Createiti from "../assets/createitinerary.png";
import Shareiti from "../assets/shareitinerary.png";
import Shareexp from "../assets/shareexperience.png";
import { Link } from 'react-router-dom';

function UserServices() {
  return (

   <>
   
<div className="user-service-container">

  <div className="user-service-card">
    <div className='card-img'>
      <img alt='create' src={Createiti}></img> 
    </div>
    <div className='create-itinerary'>
      <Link className='user-card-link' to="/createitinerarypage"><h3>Create Itinerary</h3></Link>
      <p>Plan and organize your trips efficiently with our tools.</p>
    </div>
  </div>

  <div className="user-service-card">
    <div className='card-img'>
      <img alt='share' src={Shareiti}></img>
    </div>
    <div className='share-itinerary'>
      <Link className='user-card-link' to="/shareitinerarypage"><h3>Share Itinerary</h3></Link>
      <p>Easily share your travel itinerary with friends and family.</p>
    </div>
  </div>

  <div className="user-service-card">
    <div className='card-img'>
      <img alt='expenses' src={Calculator}></img>
    </div>
    <div className='track-expenses'>
      <Link className='user-card-link' to="/trackexpensespage"><h3>Track Expenses</h3></Link>
      <p>Keep track of your expenditures with our tools.</p>
    </div>
  </div>

  <div className="user-service-card">
    <div className='card-img'>
      <img alt='experience' src={Shareexp}></img>
    </div>
    <div className='share-exp'>
      <Link className='user-card-link' to="/shareexperiences"><h3>Share Experiences</h3></Link>
      <p>Read and share authentic travel experiences.</p>
    </div>
  </div>

</div>

   </>

  )
}

export default UserServices;
