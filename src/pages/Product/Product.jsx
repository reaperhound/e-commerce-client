import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Product.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";


const Product = () => {
  useDocumentTitle("Products")
  const { name } = useParams();
  const [query] = useSearchParams();
  const { brand, img, price } = Object.fromEntries([...query]);

  const productRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const TL = gsap.timeline({defaults: {x: -1800, duration: 0.9, ease: "power1.out"}});

      TL.from(".product__imgContainer", {x: -1300})
      .from(".product__details--name", {}, "-=0.85")
      .from(".product__details--rating", {}, "-=0.85")
      .from(".product__details--brand", {}, "-=0.85")
      .from(".product__details--price", {}, "-=0.85")
      .from(".product__details--color", {}, "-=0.85")
      .from(".product__details--someText", {}, "-=0.85")
      .from(".product__details--sizeText", {}, "-=0.85")
      .from(".product__details--sizeBoxCont", {}, "-=0.85")
      .from(".product__details--cartBtn", {}, "-=0.85")
      .from(".product__details--buyBtn", {}, "-=0.85")


      return () => ctx.revert();
    }, productRef)
  },[])

  const navigate = useNavigate()
  return (
    <div className='product'>
      <Navbar />
      <div  onClick={() => navigate(-1)} className='product__arrow'>
        <img src='/back.png' alt='' />
      </div>

      <div ref={productRef} className='product__Container'>
        <div className='product__imgContainer'>
          <img src={img} alt={name} />
        </div>

        <div className='product__details'>
          <h1 className='product__details--name'>{name.substring(0, 41)}..</h1>

          <p className='product__details--rating'>4.6 ⭐</p>

          <h4 className='product__details--brand'>{brand}</h4>

          <h3 className='product__details--price'>${price}</h3>

          <h5 className='product__details--color'>
            color:
            <div></div>
          </h5>

          <p className='product__details--someText'>
            Consider a 1/2 size up from your usual size if you have wide feet or
            are between sizes
          </p>

          <h6 className='product__details--sizeText'>Sizes:</h6>

          <div className='product__details--sizeBoxCont'>
            <div>6</div>
            <div>7</div>
            <div>8.5</div>
            <div>9</div>
            <div>10</div>
            <div>12</div>
          </div>

          <button className='product__details--cartBtn'>Add to Cart</button>
          <button className='product__details--buyBtn'>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Product;