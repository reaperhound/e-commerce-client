import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import data from "./shoes.json";
import "./Category.scss"
import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";

const Category = () => {
  let { catName: params } = useParams();

  let catContainer = useRef(null)
  let TL = useRef(null)
 
  useEffect(() => {
    const ctx = gsap.context(() => {
      const TL = gsap.timeline();

      TL
      .from('.category__imageContainer', {
        scale: 0.5,
        x: -2000,
        // rotateX: 180,
        // rotateY: 180,
        duration: 0.75,
        ease: "power1.out",
        stagger: {
          amount: 0.75,
        }
      },)
    }, catContainer)
  }, [])

  return (
    <div ref={catContainer} className="category">
      <Navbar />
      <div className="category_container">
        <div className='category__head'>
          <h1>{params.toLocaleUpperCase()}</h1>
        </div>

        <div className='category__prodcontainer'>
          {data.map((item) => {
            let { img, name, brand, price } = item;
            return (
              <div key={name} className='category__imageContainer'>
                <img src={img} alt='' />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
