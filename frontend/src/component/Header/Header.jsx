import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="mainnav-bar">
      {/* <Router> */}
      <Link to="/" className="link">User</Link>
      <span className="bar"></span>
      <Link to="register" className="link">Register</Link>
      {/* </Router> */}
    </nav>
  );
}

export default Header;
