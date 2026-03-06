import React from "react";
import "./globals.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OTPVerification from "./pages/OTPVerification";
import MainPage from "./pages/MainPage";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/main-page" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
