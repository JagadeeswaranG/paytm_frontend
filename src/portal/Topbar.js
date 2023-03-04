import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../img/paytm.png";

function Topbar() {
  const [userName, setuserName] = useState();
  const [userid, setuserId] = useState();
  const navigate = useNavigate();
  
  useEffect(() => {
    setuserName(localStorage.getItem("un"));
    setuserId(localStorage.getItem("uId"));
  });

  // Logout & Clear LoaclStorage
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light1 ">
      <div class="container px-4 px-lg-5">
        <img id="logo" src={logo} alt="logo" />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page">
                <h5>Home</h5>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <h5>About</h5>
              </a>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to={`/dashboard/products/${userid}`}>
                <h5>All Products</h5>
              </Link>
            </li>
          </ul>
          <form class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>{userName}</b>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link to={`/dashboard/mybills/${userid}`} class="dropdown-item" >
                      My Bills
                    </Link>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <button class="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
