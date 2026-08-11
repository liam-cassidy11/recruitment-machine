import React from "react";
import { Link } from "react-router-dom";

// TODO: once auth is wired up, swap `isLoggedIn` for real state
// (e.g. from a useAuth() hook or Supabase's onAuthStateChange).
export default function Navbar({ isLoggedIn = false }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Recruitment Machine</Link>
      <div className="navbar-links">
        {isLoggedIn ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}