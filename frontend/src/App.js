import React, { useState } from 'react';
import "./App.css";
import {Navigate,Route, Routes } from 'react-router-dom';
import RefreshHandler from './components/RefreshHandler';
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';
import SignUp from './routes/SignUp'; 
import Login from "./routes/Login";
import LoggedUserPage from "./routes/LoggedUserPage";
import CreateItineraryPage from "./components/CreateItineraryPage";
import ShareItineraryPage from "./components/ShareItineraryPage";
import TrackExpensesPage from "./components/TrackExpensesPage";
import ShareExperiences from "./components/ShareExperiences";



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
          
          <Route path='/createitinerarypage' element={<PrivateRoute element={<CreateItineraryPage/>}/>}></Route>
          
          <Route path='/shareitinerarypage' element={<PrivateRoute element={< ShareItineraryPage />}/>}></Route>
          
          <Route path='/trackexpensespage' element={<PrivateRoute element={<TrackExpensesPage/>}/>}></Route>
          
          <Route path='/shareexperiences' element={<PrivateRoute element={<ShareExperiences/>}/>}></Route>
          
          
        </Routes>
    
    </div>
  );
}

export default App;
