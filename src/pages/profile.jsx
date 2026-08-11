import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Hero from "../components/profile/hero";
import Video from "../components/profile/video";
import Stats from "../components/profile/stats";
import Academics from "../components/profile/academics";
import Schedule from "../components/profile/schedule";
import Contact from "../components/profile/contact";
import { supabase } from "../lib/supabaseClient";

// This is the page coaches actually see. It's public — no login required.
export default function AthleteProfile() {
  const { slug } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (cancelled) return;

      if (error || !data) {
        setNotFound(true);
      } else {
        setAthlete(data);
      }
      setLoading(false);
    };

    loadProfile();

    // Avoids a "set state on unmounted component" warning if the user
    // navigates away before the fetch resolves.
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (notFound) return <p>No profile found for "{slug}".</p>;

  return (
    <div className="athlete-profile">
      <Hero athlete={athlete} />
      <Video athlete={athlete} />
      <Stats athlete={athlete} />
      <Academics athlete={athlete} />
      <Schedule athlete={athlete} />
      <Contact athlete={athlete} />
    </div>
  );
}