import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../components/SignUpStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError,handleSuccess} from "../utils";

function SignUp() {

    const [signupInfo, setSignupInfo]= useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const handleChange =(e)=>{

        const {name,value}= e.target;

        console.log(name,value);

        const copySignupInfo={...signupInfo};

        copySignupInfo[name]=value;

        setSignupInfo(copySignupInfo);
    }

    const handleSignup=async(e)=>{

        e.preventDefault();

        const {name,email,password}=signupInfo;

        if(!name || !email || !password){

            return handleError('All fields are mandatory')
        }

        try {
            const url = "http://localhost:8080/auth/signup";

            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(signupInfo)
            });

            const result = await response.json();

            const {success,message,error}=result;

            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)

            } else if(error){

                const details =error?.details[0].message;

                handleError(details);

            } else if(!success){

                handleError(message);
            }

            console.log(result);
        }
        catch(err){
            handleError(err);
        }
    }
    


  return (

    <>
    
    <Navbar/>

    <div className="container">
            <div className="wrapper">
                <div className="title">
                    <span>Join us</span>
                </div>
                <p className="title_para">
                    Please enter your details to sign up.
                </p>

                <form onSubmit={handleSignup}>

                    <div className="row">
                        <input 
                        onChange={handleChange}type="text" 
                        autoFocus
                        placeholder="Name" 
                        name='name'
                        value={signupInfo.name}/>
                    </div>

                    <div className="row">
                        <input 
                         onChange={handleChange}type="email"placeholder="Email" 
                        name='email'
                         value={signupInfo.email} />
                    </div>

                    <div className="row">
                        <input 
                         onChange={handleChange}type="password" 
                        placeholder="Password" 
                        name='password'
                        value={signupInfo.password} />
                    </div>

                    <div className="row button">
                        <button
                        type='submit'>
                            Sign Up
                        </button>
                    </div>

                    <div className="signup-link">
                    <span>Already have an account? <Link to="/login">Log in</Link></span>
                    </div>
                </form>

                <ToastContainer/>
            </div>
        </div>

    


    <Footer/> 
    </>
  )
}

export default SignUp;



