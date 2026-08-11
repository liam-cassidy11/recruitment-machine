import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      <h1>Build your recruiting profile</h1>
      <p>
        One page for your stats, film, academics, and schedule. A single
        link to send to college coaches!
      </p>
      <Link to="/signup" className="btn btn-primary">Get Started</Link>
    </div>
  );
}