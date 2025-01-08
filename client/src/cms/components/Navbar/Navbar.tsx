import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ width }: { width: number }) {
  const location = useLocation();

  return (
    <nav className={width < 700 ? "mobileNavbar" : "Navbar"}>
      <div className={location.pathname === "/" ? "current" : ""}>
        <Link to="/cms/">Home</Link>
      </div>
      <div className={location.pathname === "/location" ? "current" : ""}>
        <Link to="/cms/location">Lokal</Link>
      </div>
      <div className={location.pathname === "/cuisine" ? "current" : ""}>
        <Link to="/cms/cuisine">Küche</Link>
      </div>
      <div className={location.pathname === "/rooms" ? "current" : ""}>
        <Link to="/cms/rooms">Zimmer</Link>
      </div>
      <div className={location.pathname === "/partner" ? "current" : ""}>
        <Link to="/cms/partner">Partner</Link>
      </div>
      <div className={location.pathname === "/contact" ? "current" : ""}>
        <Link to="/cms/contact">Kontakt</Link>
      </div>
    </nav>
  );
}

export default Navbar;
