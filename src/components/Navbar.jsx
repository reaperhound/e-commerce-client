import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className='navbar'>
      {/* //`  Logo  */}
      <div className='nav__logo'>
        <img src='/LOGO.png' alt='' />
      </div>

      {/* //` SearchBox */}
      <div className='nav__searchBox'>
        <input type='text' />
      </div>

      {/* //` Cart Icon  */}
      <div className='nav__cartIcon'></div>

      {/* //` Auth Button */}
      <div className='nav__button'>
        <button>
            AUTH
        </button>
      </div>
    </div>
  );
};

export default Navbar;
