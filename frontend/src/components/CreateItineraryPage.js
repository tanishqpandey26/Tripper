import React from 'react';
import UserFunctionalityNavbar from './UserFunctionalityNavbar';
import "./CreateItineraryPageStyles.css";
import CreateImg from  "../assets/create.png";


function CreateItineraryPage() {
  return (

    <>    
    <UserFunctionalityNavbar/>

    <div className='create-head'>
    <h1>Create Your Itinerary</h1>
    </div>

    <div className="iti-page">
    
        <div className="create-iti-img">
          <img src={CreateImg} alt="Create Itinerary" />
        </div>

        <div className="create-iti-form">
          <form>

            <input type="text" name="trip-title" placeholder="Trip Title" required />

            <label for="dob"> From: </label>
            <input type="date" id="from"/>

            
            <label for="dob"> To: </label>
            <input type="date" id="to"/>

            <textarea placeholder='Remarks' rows="10" name='message' required></textarea>

            <button type="submit">Create Itinerary</button>

          </form>
        </div>
      </div>


      <h1>Your Itinerary</h1>
      <div className='itineraries'>
        <p>Itinerary here!</p>
      </div>
    </>
    
  )
}

export default CreateItineraryPage
