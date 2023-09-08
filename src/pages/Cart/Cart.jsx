import { useDocumentTitle } from "@uidotdev/usehooks";
import Navbar from "../../components/Navbar";
import { useStore } from "../../store/store";
import { useEffect } from "react";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStatus from "../../utils/Hooks/useAuthStatus";

const Cart = () => {
  useDocumentTitle("Cart");
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);

  const cartItems = useStore((state) => state.cartItems);
  const addToCart = useStore((state) => state.addToCartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const incrementCount = useStore((state) => state.incrementCount);
  const decrementCount = useStore((state) => state.decrementCount);

  useEffect(() => {
    const am = cartItems.reduce((acc, curr) => {
      acc = acc + Number.parseInt(curr.price * curr.count);
      return acc;
    }, 0);
    setTotalAmount(am);
  }, [cartItems]);

  const authenticated = useAuthStatus();

  if (!authenticated) {
    navigate("/auth/signup");
  }

  console.log(cartItems);
  return (
    <div className='cart'>
      <Navbar />
      <div onClick={() => navigate(-1)} className='cart__arrow'>
        <img src='/back.png' alt='' />
      </div>

      <div className='cart__container'>
        {cartItems.map((item) => {
          const {
            brand,
            count,
            img,
            price,
            title,
            _id,
            category,
            description,
            reviews,
          } = item;
          return (
            <div key={title} className='cart__productRow'>
              <div className='cart__productRow--imgCont'>
                <Link
                  to={`/products/${_id}?brand=${brand}&img=${img}&price=${price}&category=${category}&description=${description}&reviews=${reviews}&title=${title}`}
                >
                  <img src={img} alt={title} />
                </Link>
              </div>
              <div className='cart__productRow--prodDetails'>
                <div>
                  <p>{title.substring(0, 44)}</p>
                </div>
              </div>
              <div className='cart__productRow--controls'>
                <div className='cart__productRow--quantityCont'>
                  <div
                    className='cart__productRow--dec'
                    onClick={() => decrementCount({ _id })}
                  >
                    {/* <button onClick={() => decrementCount({name: 'nike', count: 5})}>DEC</button> */}
                    <img src='/minus.png' alt='' />
                  </div>
                  <div className='cart__productRow--count'>
                    <span>{count}</span>
                  </div>
                  <div
                    onClick={() => incrementCount({ _id })}
                    className='cart__productRow--inc'
                  >
                    <img src='/add.png' alt='' />
                  </div>
                </div>

                <div
                  onClick={() => removeFromCart({ _id })}
                  className='cart__productRow--delCont'
                >
                  <img src='/x-mark.png' alt='' />
                </div>
              </div>

              <div className='cart__productRow--price'>
                <span>${(price * count).toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className='cart__divider'>
        <span>${totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Cart;
