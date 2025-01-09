import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard"
import Send from "./components/Send";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/send' element={<Send/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
