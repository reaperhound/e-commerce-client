import React from "react";
import { useState } from "react";
import { useRef } from "react";
import "./Login.scss";
import { useEffect } from "react";
import { gsap } from "gsap";
import { animateFormLogIn } from "../SignupAnimation";
import axios from "axios";
import { setUserToLocal } from "../../../utils/JWT";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";


const Login = () => {
  useDocumentTitle("Sign in")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formContainer = useRef(null);
  const TL = useRef(null);

  const navigate = useNavigate()

  const buttonAnim = gsap.to(".form__submit-btn", {
    // scale: 0.75,
    rotateY: 360,
    // yoyo: true,
    // repeat: 1,
    duration: 0.55,
    ease: "power4",
    paused: true,
  });

  async function loginHandler() {
    try {
      buttonAnim.restart();
      const response = axios.post("https://e-commerce-api-fa1t.onrender.com/auth/login", {
        email,
        password,
      });
      const { data } = await response;
      console.log(data);
      setUserToLocal(data.token);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let ctx = gsap.context(() => {
      animateFormLogIn(TL.current);
    }, formContainer);

    return () => ctx.revert();
  }, []);
  return (
    <div className='formLogin' ref={formContainer}>
      <form className='form__form' onSubmit={(e) => e.preventDefault()}>
        <div className='form__title'>
          <h1>Log In</h1>
        </div>
        <div className='form__email'>
          <input
            placeholder='email'
            className='form__email--input'
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='form__password'>
          <input
            placeholder='password'
            className='form__password--input'
            type='text'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button
          type='submit'
          onClick={loginHandler}
          className='form__submit-btn'
        >
          Log in
        </button>

        <h3>
          Don't have an account ?{" "}
          <Link to={"/auth/signup"}>
            <span>Sign Up</span>
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;
