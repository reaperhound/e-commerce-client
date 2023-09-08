import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Product.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from "@uidotdev/usehooks";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { useStore } from "../../store/store";
import { useStripe } from "@stripe/react-stripe-js";
import { useElements } from "@stripe/react-stripe-js";
import useAuthStatus from "../../utils/Hooks/useAuthStatus";

const Product = () => {
  useDocumentTitle("Products");
  const { _id } = useParams();
  const [query] = useSearchParams();
  const { brand, img, price, title, category, description, reviews } =
    Object.fromEntries([...query]);

  const addToCart = useStore((state) => state.addToCartItems);
  const cartItems = useStore((state) => state.cartItems);

  const productRef = useRef(null);

  const InCart = () => {
    return cartItems.some((item) => item.title === title);
  };

  console.log(InCart());

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const TL = gsap.timeline({
        defaults: { x: -1800, duration: 0.9, ease: "power1.out" },
      });

      TL.from(".product__imgContainer", { x: -1300 })
        .from(".product__details--name", {}, "-=0.85")
        .from(".product__details--rating", {}, "-=0.85")
        .from(".product__details--brand", {}, "-=0.85")
        .from(".product__details--price", {}, "-=0.85")
        .from(".product__details--color", {}, "-=0.85")
        .from(".product__details--someText", {}, "-=0.85")
        .from(".product__details--sizeText", {}, "-=0.85")
        .from(".product__details--sizeBoxCont", {}, "-=0.85")
        .from(".product__details--cartBtn", {}, "-=0.85")
        .from(".product__details--buyBtn", {}, "-=0.85");

      return () => ctx.revert();
    }, productRef);
  }, []);

  function handleAddToCart() {
    addToCart({
      title,
      _id,
      brand,
      img,
      count: 1,
      price,
      category,
      description,
      reviews,
    });
  }

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  async function paymentHandler(event) {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch(
        "/.netlify/functions-serve/create-payment-intent",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: Number.parseInt(price) }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const authenticated = useAuthStatus();

  if (!authenticated) {
    navigate("auth/signup");
  }

  return (
    <div className='product'>
      <Navbar />
      <div onClick={() => navigate(-1)} className='product__arrow'>
        <img src='/back.png' alt='' />
      </div>

      <div ref={productRef} className='product__Container'>
        <div className='product__imgContainer'>
          <img src={img} alt={title} />
        </div>

        <div className='product__details'>
          <h1 className='product__details--name'>{title.substring(0, 41)}..</h1>
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
          {InCart() ? (
            <button className='product__details--cartBtn-disabled' disabled>
              In Cart
            </button>
          ) : (
            <button
              className='product__details--cartBtn'
              onClick={() => handleAddToCart()}
            >
              Add to Cart
            </button>
          )}
          <button className='product__details--buyBtn' onClick={paymentHandler}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
