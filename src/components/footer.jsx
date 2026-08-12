import React from "react";
 
export default function Footer() {
  return (
    <footer className="footer">
      <p> {new Date().getFullYear()} RecruitmentDB</p>
      <p className="footer-credit">
        Built by Liam Cassidy ·{" "}
        <a href="mailto:liam@example.com">lcassid413@gmail.com</a> ·{" "}
        <a href="tel:+15555550142">(845) 372-7409</a>
      </p>
    </footer>
  );
}