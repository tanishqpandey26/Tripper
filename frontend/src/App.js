import React, { useState } from 'react';
import "./App.css";
import {Navigate,Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';
import SignUp from './routes/SignUp'; 
import Login from "./routes/Login";
import LoggedUserPage from "./routes/LoggedUserPage";
import RefreshHandler from './components/RefreshHandler';


function App() {

  const [isAuthenticated, setIsAuthenticated]= useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to="/login"/>
  }


  return (
    <div className="App">

      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>

        <Routes>

          <Route path='/' element={<Home/>}></Route>
          
          <Route path='/about' element={<About/>}></Route>
          
          <Route path='/contact' element={<Contact/>}></Route>
          
          <Route path='/service' element={<Service/>}></Route>

          <Route path='/signup' element={<SignUp/>}></Route>

          
          <Route path='/login' element={<Login/>}></Route>

          <Route path='/loggeduserpage' element={<PrivateRoute element={<LoggedUserPage/>}/>}></Route>
          
          
        </Routes>
    
    </div>
  );
}

export default App;
