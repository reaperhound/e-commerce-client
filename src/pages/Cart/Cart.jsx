import { useDocumentTitle } from "@uidotdev/usehooks";
import Navbar from "../../components/Navbar";
import { useStore } from "../../store/store";
import { useEffect } from "react";
import "./Cart.scss";

const Cart = () => {
  useDocumentTitle("Cart");

  const cartItem = useStore((state) => state.cartItems);
  const addToCart = useStore((state) => state.addToCartItems);
  const removeFromCart = useStore((state) => state.removeFromCart);
  console.log(cartItem);
  return (
    <div className='cart'>
      <Navbar />

      <div className='cart__container'>
        <div className='cart__productRow'>
          <div className='cart__productRow--imgCont'>
            <img
              src='https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/22605718/2023/4/1/840e1a00-9f11-4dde-93e9-380aa0c0ddf71680333058463HERENOWMenWhiteWovenDesignPUSneakers1.jpg'
              alt=''
            />
          </div>
          <div className='cart__productRow--prodDetails'>
            <div>
              <p>ADDIDAS</p>
            </div>
          </div>
          <div className='cart__productRow--controls'>
            <div className='cart__productRow--quantityCont'>
              <div className='cart__productRow--dec'>
                <button>INC</button>
              </div>
              <div className='cart__productRow--count'>
                <span>10</span>
              </div>
              <div className='cart__productRow--inc'>
                <button>DEC</button>
              </div>
            </div>
            <div className='cart__productRow--delCont'>
              <div>
                <button>DEL</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
