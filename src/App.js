import React from 'react';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import taskAdd from './Components/Task';
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import DashBoard from './Components/DashBoard';

const  App =() => {
  return (
  <Router>
   <Routes>
    <Route path='/signup' element={<Signup/>} exact/>
    <Route path='' element={<Login />} exact/>
    <Route path='/dashboard' element={<DashBoard />} exact/>
    {/* <Route path='/taskadd' element={<TaskAdd />} exact/> */}
   </Routes>
   </Router>
  );
}

export default App;
