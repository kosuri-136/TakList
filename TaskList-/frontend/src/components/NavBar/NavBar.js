import React from "react";
import navbaricon from "../../assets/images/navicon.png";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="pb-4">
      <nav class="navbar navbar-light bg-white custom-nav">
        <span class="navbar-brand nav-text">
          <img
            src={navbaricon}
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt="icon"
            onClick={() => navigate("/")}
          />
          Todo-List
        </span>
      </nav>
    </div>
  );
};

export default NavBar;
