// src/js/Main.jsx 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'

import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Mentor from './Mentor.jsx'
import FeedBack from './FeedBack.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/mentor' element={<Mentor/>}/>
      <Route path='/feedback' element={<FeedBack/>}/>
    </Routes>
  </BrowserRouter>
)

