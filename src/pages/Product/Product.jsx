import { useParams, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./Product.scss";

const Product = () => {
  const { name } = useParams();
  const [query] = useSearchParams();
  const { brand, img, price } = Object.fromEntries([...query]);
  return (
    <div className='product'>
      <Navbar />

      <div className='product__Container'>
        <div className='product__imgContainer'>
          <img src={img} alt={name} />
        </div>

        <div className='product__details'>
          <h1 className='product__details--name'>{name}</h1>

          <p className='product__details--rating'>4.6</p>

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

          <h6 className='product__details--sizesText'>SIzes:</h6>
        </div>
      </div>
    </div>
  );
};

export default Product;
