// React imports
import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

// Router and component imports
import "./Home.scss"
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader/Loader";

// Animation library import
import { gsap } from "gsap";

// Utility functions and custom hooks
import { getUserFromLocal } from "../../utils/JWT";
import { useDocumentTitle } from "@uidotdev/usehooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // Set the document title
  useDocumentTitle("Home");

  // State for category list
  const [categoryList, setCategoryList] = useState([]);

  // Get user from local storage
  let user = getUserFromLocal();

  const navigate = useNavigate();
  // If the user is not found, display an error
  if (user === false) {
    // return <div>Error</div>;
    navigate("/auth/signup");
  }
  user = JSON.parse(user);

  // Reference to the home container element for animations
  let homeContainer = useRef(null);

  // Animation using gsap and react's useLayoutEffect
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const TL = gsap.timeline({
        defaults: { x: -2500, ease: "power1.out", duration: 0.85 },
      });
      TL.from(".home__categoryContainer--imgCont0", {})
        .from(".home__categoryContainer--imgCont1", {}, "-=0.55")
        .from(".home__categoryContainer--imgCont2", {}, "-=0.55")
        .from(".home__categoryContainer--imgCont3", {}, "-=0.55");
    }, homeContainer);

    return () => ctx.revert();
  }, [categoryList]);

  // Fetch categories from an API using axios
  useEffect(() => {
    async function fetchCategories() {
      const categories = await axios.get(
        "https://e-commerce-api-fa1t.onrender.com/category"
      );
      setCategoryList(categories.data?.data);
    }

    fetchCategories();
  }, []);

  // If categoryList is empty, display a loader
  if (categoryList.length === 0) {
    return <Loader />;
  }

  console.log("categoryList", categoryList);

  // Render the Home component
  return (
    <div className='home'>
      <Navbar />
      <div className='home__categoryContainer' ref={homeContainer}>
        {categoryList.map((category, index) => {
          return (
            <div
              key={category}
              className={`home__categoryContainer--imgCont${index}`}
            >
              <Link to={`/category/${category}`}>
                <div className='overlay'>
                  <span>{category}</span>
                </div>
                <img src={`/${category}.jpg`} alt='' />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
