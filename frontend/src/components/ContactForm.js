import React,{useState,useEffect} from 'react';
import "./ContactFormStyles.css";

function ContactForm() {

    const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "568366da-d0e4-4ea2-8ac5-036d6c2eecef");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (

    <div className='form-container'>

        <h1>Send a message to us!</h1>

        <form onSubmit={onSubmit}>

            <input type="text" name='name' placeholder='Name' required></input>

            <input type="email" name='email' placeholder='Email' required></input>

            <input placeholder='Subject' required></input>

            <textarea placeholder='Message' rows="4" name='message' required></textarea>

            <button type="submit">Send Message</button>

        </form>

        <span>{result}</span>
      
    </div>

  )
}

export default ContactForm;
