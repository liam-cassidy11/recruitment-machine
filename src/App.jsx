import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/Resetpassword";
import Dashboard from "./pages/dashboard";
import AthleteProfile from "./pages/profile";
import Onboarding from "./components/onboarding/onboarding"; // from onboarding folder

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/athlete/:slug" element={<AthleteProfile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}