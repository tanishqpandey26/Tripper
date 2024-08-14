import React from 'react';
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import ServiceImg from "../assets/servicepage.png";
import Footer from "../components/Footer";
import ServiceContent from '../components/ServiceContent';

function Service() {
  return (
    

    <>
    <Navbar/>
    
    <Hero
    cName="hero-mid"
    heroImg={ServiceImg}
    title="Service"
    btnClass="hide"
    />

    <ServiceContent/>

    <Footer/>
    
    </>



  )
}

export default Service
