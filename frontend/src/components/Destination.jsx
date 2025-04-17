import React from 'react';
import HomeImg1 from "../assets/homeimage1.jpg";
import HomeImg2 from "../assets/homeimage2.jpg";
import HomeImg3 from "../assets/homeimage3.jpg";
import HomeImg4 from "../assets/homeimage4.jpg";
import HomeImg5 from "../assets/homeimage5.jpg";
import HomeImg6 from "../assets/homeimage6.jpg";
import "./DestinationStyles.css";
import DestinationData from './DestinationData';


const Destination=()=> {
  return (
    <>
    <div className='destination'>

        <h1>Our Mission</h1>
        <p>Welcome to Tripper, your ultimate travel companion designed to make trip planning a breeze. </p>

        <DestinationData

        className="first-des"

        heading="Trip Management"
        
        text="Whether you're exploring a new city or embarking on a cross-country adventure, our platform helps you manage your itinerary, keep track of expenses, and ensure you never miss a moment of excitement. "
        
        img1={HomeImg1}

        img2={HomeImg2}
        />

       <DestinationData

        className="first-des-reverse"

        heading="Share Itinerary"
        
        text="With Tripper, you can create detailed travel plans, set budgets, and effortlessly organize every aspect of your journey. Say goodbye to the hassle of scattered notes and multiple apps."
        
        img1={HomeImg3}

        img2={HomeImg4}
        />

<DestinationData

className="first-des"

heading="Track Expenses"

text=" Keep track of expenses, and ensure you never miss a moment of excitement. With Tripper, you can create detailed travel plans, set budgets, and effortlessly organize every aspect of your journey."

img1={HomeImg5}

img2={HomeImg6}
/>
      
    </div>


    </>
  )
}

export default Destination;



