import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Category.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useLayoutEffect } from "react";
import { useState } from "react";
import axios from "axios";
import useAuthStatus from "../../utils/Hooks/useAuthStatus";
import Loader from "../../components/Loader/Loader";

const Category = () => {
  useDocumentTitle("Categories");
  let { catName: params } = useParams();
  let catContainer = useRef(null);
  const [productsList, setProductsList] = useState([]);

  const navigate = useNavigate();

  useLayoutEffect(() => {
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
  }, [productsList]);

  useEffect(() => {
    async function fetchProductList() {
      const products = await axios.get(
        `https://e-commerce-api-fa1t.onrender.com/category/${params}`
      );
      console.log(products);
      setProductsList((await products).data?.data);
    }
    fetchProductList();
  }, []);

  const authenticated = useAuthStatus();

  if (!authenticated) {
    navigate("/auth/signup");
  }

  return (
    <>
      <div ref={catContainer} className='category'>
        <Navbar />
        {/* Loader */}
        {productsList.length === 0 && <Loader />}
        <div onClick={() => navigate(-1)} className='category__arrow'>
          <img src='/back.png' alt='' />
        </div>
        <div className='category_container'>
          <div className='category__head'>
            <h1>{params.toLocaleUpperCase()}</h1>
          </div>

          <div className='category__prodcontainer'>
            {productsList.map((item, index) => {
              let {
                image,
                title,
                brand,
                category,
                description,
                price,
                reviews,
                _id,
              } = item;
              return (
                <div key={_id} className='category__imageContainer'>
                  <Link
                    to={`/products/${_id}?brand=${brand}&img=${image}&price=${price}&category=${category}&description=${description}&reviews=${reviews}&title=${title}`}
                  >
                    <img src={image} alt={title} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
