import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from "./Sidebar/Sidebar";
import Box from '@mui/material/Box';


function App() {
  return (
    <div className='main-div'>
      <Sidebar />
    </div>
  );
}

export default App;
