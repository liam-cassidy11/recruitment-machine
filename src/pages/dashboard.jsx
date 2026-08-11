import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Dashboard() {
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAthlete = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to load athlete profile:", error.message);
      } else {
        setAthlete(data);
      }

      setLoading(false);
    };

    loadAthlete();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleCopyLink = async () => {
    if (!athlete?.slug) return;
    const url = `${window.location.origin}/athlete/${athlete.slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Your Profile</h1>

      {!athlete ? (
        <div>
          <p>You haven't finished setting up your profile yet.</p>
          <Link to="/onboarding" className="btn btn-primary">Finish Setup</Link>
        </div>
      ) : (
        <div>
          <p>Status: {athlete?.published ? "Published" : "Draft"}</p>
          <Link to="/onboarding" className="btn btn-secondary">Edit Profile</Link>
          {athlete?.published && athlete?.slug && (
            <>
              <Link to={`/athlete/${athlete.slug}`} className="btn btn-secondary">
                View Public Page
              </Link>
              <button onClick={handleCopyLink} className="btn btn-secondary">
                {copied ? "Copied!" : "Copy Profile Link"}
              </button>
            </>
          )}
        </div>
      )}

      <button onClick={handleLogout} className="btn btn-secondary" style={{ marginTop: 24 }}>
        Log Out
      </button>
    </div>
  );
}