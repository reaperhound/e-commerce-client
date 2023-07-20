import React from "react";
import { getUserFromLocal } from "../../utils/JWT";
import Navbar from "../../components/Navbar";
import "./Home.scss";

const Home = () => {
  let user = getUserFromLocal();

  if (user === false) {
    return <div>Error</div>;
  }
  user = JSON.parse(user);

  return (
    <div className='home'>
      <Navbar />

      <div className='home__categoryContainer'>
        <div className='home__categoryContainer--imgCont1'>
          <a href=''>
            <img src='' alt='' />
          </a>
        </div>
        
        <div className='home__categoryContainer--imgCont2'>
          <a href=''>
            <img src='' alt='' />
          </a>
        </div>

        <div className='home__categoryContainer--imgCont3'>
          <a href=''>
            <img src='' alt='' />
          </a>
        </div>
        
        <div className='home__categoryContainer--imgCont4'>
          <a href=''>
            <img src='' alt='' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
