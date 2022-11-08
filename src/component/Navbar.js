import React from "react";
import { Link, NavLink } from 'react-router-dom';
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="NavBar">
        <h1>Todo App</h1>
        <ul>
        <li>Logout</li>
            {/*<li>Home</li>
            <li>Login</li>
            <li>Register</li>
  <li>Logout</li>*/}
        </ul>
    </nav>
  );
}

export default Navbar;
