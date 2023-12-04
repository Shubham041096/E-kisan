import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export default function ProductItem(props) {
  const dispatch = useDispatch();

  const { name, price, id } = props;

  const addToCartHandler = () => {
    
    dispatch(
      addToCart({
        id,
        name,
        price,
      })
    );
  };
  const removeFromCartHandler = () => {
    dispatch(removeFromCart(id));
  };
  return (
    <div className="col md-4 my-4">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">₹{price}</p>
          <button className="btn btn-primary" onClick={removeFromCartHandler}>
            -
          </button>
          <p>Add to cart</p>
          <button className="btn btn-primary" onClick={addToCartHandler}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}
