import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";
import pages from "../../pages/pages.ts";

function Navbar({ width }: { width: number }) {
  const location = useLocation();

  return (
    <nav className={width < 700 ? styles.mobileNavbar : styles.Navbar}>
      {pages.map((page) => (
        <div key={page.path} className={location.pathname === page.path ? styles.current : ""}>
          <Link  to={"/cms" + page.path}>{page.title}</Link>
        </div>
      ))}
    </nav>
  );
}

export default Navbar;
