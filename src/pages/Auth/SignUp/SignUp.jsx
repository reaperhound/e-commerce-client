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
import Modal from "../../../components/Modal/Modal";
import { useLayoutEffect } from "react";

// import { setToken } from "../../../utils/JWT";

const SignUp = () => {
  useDocumentTitle("Sign Up");

  //# useState for form management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //# useState for Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //# ref for context
  const formContainer = useRef(null);

  //# ref for timeline
  let TL = useRef(null);

  let btnRef = useRef(null);
  const navigate = useNavigate();

  const buttonAnim = gsap.to(".form__submit-btn", {
    rotateY: 360,
    duration: 0.55,
    ease: "power4",
    paused: true,
  });

  //# form handler
  async function signUpHandler() {
    try {
      buttonAnim.restart();
      const response = await axios.post(
        "https://e-commerce-api-fa1t.onrender.com/auth/register",
        {
          username,
          password,
          email,
        }
      );
      console.log("signup response", response.data.data);

      navigate("/auth/signin");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 400) {
        console.log("eroor message", error.response.data.error);
        setModalMessage(error.response.data.error);
        setIsModalOpen(true);
      }
    }
  }

  //# animation useEffect
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      animateFormSignUp(TL.current);
    }, formContainer);
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/*//@ Modal  */}
      {isModalOpen && (
        <Modal
          content={<ModalContent message={modalMessage} />}
          closingStateFunction={setIsModalOpen}
          width='40vw'
          height='20vh'
        />
      )}

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
    </>
  );
};

export default SignUp;

function ModalContent({ message }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
          width: "100%",
          height: "100%",
        }}
      >
        {message}
      </div>
    </>
  );
}
