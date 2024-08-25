import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../components/LoginStyles.css";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError,handleSuccess} from "../utils";


function Login() {

    const [loginInfo, setLoginInfo]= useState({
        email:'',
        password:''
    })

    
    const navigate = useNavigate();

    const handleChange =(e)=>{

        const {name,value}= e.target;

        // console.log(name,value);

        const copyLoginInfo={...loginInfo};

        copyLoginInfo[name]=value;

        setLoginInfo(copyLoginInfo);
    }


    const handleLogin=async(e)=>{

        e.preventDefault();

        const {email,password}=loginInfo;

        if(!email || !password){

            return handleError('All fields are mandatory')
        }

        try {
            const url = "https://tripper-api.vercel.app/auth/login";

            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(loginInfo)
            });

            const result = await response.json();

            const {success,message,jwtToken,name,error}=result;

            if(success){

                handleSuccess(message);

                localStorage.setItem('token',jwtToken);

                localStorage.setItem('loggedInUser',name);

                setTimeout(()=>{
                    navigate('/loggeduserpage')
                },1000)

            } else if(error){

                const details =error?.details[0].message;

                handleError(details);

            } else if(!success){

                handleError(message);
            }

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
                    <span>Welcome back</span>
                </div>
                <p className="title_para">
                    Please enter your details to sign in.
                </p>

                <form onSubmit={handleLogin}>

                    <div className="row">
                        <input 
                        onChange={handleChange}type="email"
                        name='email' placeholder="Email"
                        value={loginInfo.email}  />
                    </div>

                    <div className="row">
                        <input 
                        onChange={handleChange}type="password" placeholder="Password"
                        name='password'
                        value={loginInfo.password} />
                    </div>

                    <div className="pass">
                        <a href="/signup">Forgot password?</a>
                    </div>
                    <div className="row button">
                        <input type="submit" value="Login" />
                    </div>
                    <div className="signup-link">
                        <span>Not a member? <Link to="/signup">Sign Up</Link></span>
                    </div>
                </form>
            </div>
        </div>

        <ToastContainer/>

   <Footer/>
   </>
  )
}

export default Login;







    





    






