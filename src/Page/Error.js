import React from "react";
import { NavLink } from "react-router-dom"
import NotPageImg from "../assets/notfound.png"
import "./404.css";

function Error(){
  return (
    <div id="NotPage">
        <NotPageImg/>
      <NavLink to="/" className="back-btn">Go Back</NavLink>
    </div>
  );
}

export default Error;
