import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import data from "./shoes.json";
import "./Category.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Category = () => {
  let { catName: params } = useParams();

  let catContainer = useRef(null);
  let TL = useRef(null);

  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const TL = gsap.timeline();

      TL.from(".category__imageContainer", {
        scale: 0.5,
        x: -2000,
        duration: 0.75,
        ease: "power1.out",
        stagger: {
          amount: 0.75,
        },
      });
    }, catContainer);
  }, []);

  return (
    <div ref={catContainer} className='category'>
      <Navbar />
      <div onClick={() => navigate(-1)} className='category__arrow'>
        <img src='/back.png' alt='' />
      </div>
      <div className='category_container'>
        <div className='category__head'>
          <h1>{params.toLocaleUpperCase()}</h1>
        </div>

        <div className='category__prodcontainer'>
          {data.map((item) => {
            let { img, name, brand, price } = item;
            return (
              <div key={name} className='category__imageContainer'>
                <Link to={`/products/${name}?brand=${brand}&img=${img}&price=${price}`}>
                  <img src={img} alt='' />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
