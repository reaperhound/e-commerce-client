import React from "react";
import "./Navbar.scss";
import { getUserFromLocal } from "../utils/JWT";
import { useStore } from "../store/store";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { gsap } from "gsap";
import { useHover } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { useState } from "react";

const Navbar = () => {
  let user = getUserFromLocal();
  const [cartCount, setCartCount] = useState(0);
  const cartItems = useStore((state) => state.cartItems);

  useEffect(() => {
    let temp = cartItems.reduce((acc, curr) => {
      acc = acc + Number.parseInt(curr.count);
      return acc;
    }, 0);
    setCartCount(temp);
  }, [cartItems]);

  function handleCart(e) {
    gsap.from(e.target, {
      keyframes: {
        opacity: [0.75, 0.5, 1],
        scale: [0.5, 1.25, 1],
      },

      duration: 0.9,
    });
  }

  function signOutHandler() {
    localStorage.removeItem("user");
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

      <div className="cart-and-auth-container">
        {/* //` Cart Icon  */}
        <Link onMouseEnter={handleCart} to={"/cart"}>
          <div className='nav__cartIcon'>
            <span>{cartCount}</span>
          </div>
        </Link>

        {/* //` Auth Button */}
        <div className='nav__button'>
          {user === false ? (
            <Link to={"/auth/signin"} className='button--pan'>
              <button className='sign-in'>
                <span>Sign In</span>
              </button>
            </Link>
          ) : (
            <button onClick={signOutHandler} className='sign-out'>
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
