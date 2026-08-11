import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// Temporary slug until the athlete sets their real name in onboarding —
// e.g. "athlete-a1b2c3d4". Swap for a name-based slug once you build that.
function generateStarterSlug() {
  return `athlete-${crypto.randomUUID().slice(0, 8)}`;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    const user = signUpData.user;

    // Create the empty athletes row this user will fill in during onboarding.
    const { error: insertError } = await supabase.from("athletes").insert({
      user_id: user.id,
      slug: generateStarterSlug(),
    });

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    navigate("/onboarding");
  };

  return (
    <div className="auth-page">
      <h1>Create Your Profile</h1>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}