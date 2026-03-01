import React from 'react'
import './globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import OTPVerification from './pages/OTPVerification'
const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/otp' element={<OTPVerification />} />
                </Routes>
            </Router>
        </>
    )
}

export default App