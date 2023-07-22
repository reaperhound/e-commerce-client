import React from "react";
import { getUserFromLocal } from "../../utils/JWT";
import Navbar from "../../components/Navbar";
import "./Home.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

const Home = () => {
  let user = getUserFromLocal();

  //` do some modal here
  // if (user === false) {
  //   return <div>Error</div>;
  // }
  user = JSON.parse(user);

  let homeContainer = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const TL = gsap.timeline({defaults: { x: -1500, ease: "power1.out", duration: 0.6 }});
      TL.from(".home__categoryContainer--imgCont1",{}, )
        .from(".home__categoryContainer--imgCont2",{}, "-=0.3")
        .from(".home__categoryContainer--imgCont3",{}, "-=0.3")
        .from(".home__categoryContainer--imgCont4",{}, "-=0.3");
    }, homeContainer);

    return () =>  ctx.revert();
  }, []);

  return (
    <div className='home'>
      <Navbar />

      <div className='home__categoryContainer' ref={homeContainer}>
        <div className='home__categoryContainer--imgCont1'>
          <Link to={"/category/sneakers"}>
          <div className='overlay'>
            <span>Shoes</span>
          </div>
            <img src='/shoe.jpg' alt='' />
          </Link>
        </div>

        <div className='home__categoryContainer--imgCont2'>
          <Link to="category/boots">
          <div className='overlay'>
            <span>Shoes</span>
          </div>
            <img src='/shoe.jpg' alt='' />
          </Link>
        </div>

        <div className='home__categoryContainer--imgCont3'>
          <Link to="category/sports">
          <div className='overlay'>
            <span>Shoes</span>
          </div>
            <img src='/shoe.jpg' alt='' />
          </Link>
        </div>

        <div className='home__categoryContainer--imgCont4'>
          <Link to="category/ladies">
          <div className='overlay'>
            <span>Shoes</span>
          </div>
            <img src='/shoe.jpg' alt='' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
