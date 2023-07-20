import React from "react";
import { useState } from "react";
import axios from "axios";
import "./SignUp.scss";
import { useEffect } from "react";
import {  animateFormSignUp } from "../SignupAnimation";
import { gsap } from "gsap";
import { useRef } from "react";

const SignUp = () => {

  //# useState for form management 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //# form handler 
  async function signUpHandler() {
    try {
      const response = axios.post("http://localhost:3000/auth/register", {
        username,
        password,
        email,
      });
      console.log((await response).data.data);
    } catch (error) {
      console.log(error);
    }
  }

  //# ref for context 
  const formContainer = useRef(null);
  //# ref for timeline 
  let TL = useRef(null);

  //# animation useEffect 
  useEffect(() => {
    let ctx = gsap.context(() => {
      animateFormSignUp(TL.current);
      
    }, formContainer);
    return () => ctx.revert();
  }, []);

  return (
    <div className='formSignUp' ref={formContainer}>
      <form className='form__form' onSubmit={(e) => e.preventDefault()}>
        <div className='form__title'>
          <h1>Sign Up</h1>
        </div>
        <div className='form__username'>
          <input
            placeholder='username'
            className='form__username--input'
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
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
          onClick={signUpHandler}
          className='form__submit-btn'
        >
          Signup
        </button>

        <h3>
          Already have an account ? <span>Login</span>
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
