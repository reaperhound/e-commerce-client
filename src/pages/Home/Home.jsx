import React from "react";
import { getUserFromLocal } from "../../utils/JWT";
import Navbar from "../../components/Navbar";
import "./Home.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useLayoutEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  useDocumentTitle("Home");
  const [categoryList, setCategoryList] = useState([]);
  let user = getUserFromLocal();

  //` do some modal here
  // if (user === false) {
  //   return <div>Error</div>;
  // }
  user = JSON.parse(user);

  let homeContainer = useRef(null);

  // useLayoutEffect(() => {
  //   let ctx = gsap.context(() => {
  //     const TL = gsap.timeline({
  //       defaults: { x: -2500, ease: "power1.out", duration: 0.75 },
  //     });
  //     TL.from(".home__categoryContainer--imgCont0", {})
  //       .from(".home__categoryContainer--imgCont1", {}, "-=0.55")
  //       .from(".home__categoryContainer--imgCont2", {}, "-=0.55")
  //       .from(".home__categoryContainer--imgCont3", {}, "-=0.55");
  //   }, homeContainer);

  //   return () => ctx.revert();
  // }, [categoryList]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = axios.get("https://e-commerce-api-fa1t.onrender.com/category");
      setCategoryList((await categories).data?.data);
    }
    fetchCategories();
  }, []);

  console.log("categoryList", categoryList);
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
