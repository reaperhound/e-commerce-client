import React from "react";
import "./Navbar.scss";
import { getUserFromLocal } from "../utils/JWT";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  let user = getUserFromLocal();

  function signOutHandler(){
    localStorage.removeItem('user');
    window.location.reload(true);
  }

  return (
    <div className='navbar'>
      {/* //`  Logo  */}
      <div className='nav__logo'>
        <Link to={"/"}>
          <img src='/ShoeTrove-logo-black.png' alt='' />
        </Link>
      </div>

      {/* //` SearchBox */}
      <div className='nav__searchBox'>
        <input type='text' placeholder='Search...' />
      </div>

      {/* //` Cart Icon  */}
      <div className='nav__cartIcon'>
        <span>24</span>
      </div>

      {/* //` Auth Button */}
      <div className='nav__button'>
        {user === false ? (
          <Link to={"/auth/signin"} className='button--pan'>
            <button className='sign-in'>
              <span>Sign In</span>
            </button>
          </Link>
        ) : (
          <button onClick={signOutHandler} className='sign-out'><span>Sign Out</span></button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
