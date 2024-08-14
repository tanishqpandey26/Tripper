import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Destination from '../components/Destination';
import Footer from "../components/Footer";

function Home() {
  return (

   <>
   
   <Navbar/>
   
   <Hero
   cName="hero"
   heroImg={require('../assets/homepage.png')}
   title="Create Your Story"
   text="Choose Your Destination"
   buttonText="Travel Plan"
   url="/"
   btnClass="show"
   />

   <Destination/>
   
   <Footer/>

   </>

  )
}

export default Home;
