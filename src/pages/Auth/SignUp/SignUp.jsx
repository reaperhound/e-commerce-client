import React from "react";
import { useState } from "react";
import axios from "axios";
import "./SignUp.scss";
import { useEffect } from "react";
import { animateFormSignUp } from "../SignupAnimation";
import { gsap } from "gsap";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";

// import { setToken } from "../../../utils/JWT";

const SignUp = () => {
  useDocumentTitle("Sign Up")

  //# useState for form management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //# ref for context
  const formContainer = useRef(null);
  //# ref for timeline
  let TL = useRef(null);

  let btnRef = useRef(null);
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

  //# form handler
  async function signUpHandler() {
    try {
      buttonAnim.restart();
      const response = axios.post("https://e-commerce-api-fa1t.onrender.com/auth/register", {
        username,
        password,
        email,
      });
      console.log((await response).data.data);

      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

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
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className='form__password'>
          <input
            placeholder='password'
            className='form__password--input'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <i></i>
        </div>
        <button
          ref={btnRef}
          type='submit'
          onClick={signUpHandler}
          className='form__submit-btn'
        >
          Signup
        </button>

        <h3>
          Already have an account ?{" "}
          <Link to={"/auth/signin"}>
            <span>Login</span>
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default SignUp;
