import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../CartItem";
import Body from "../Body";
import { resetCart } from "../../slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.totalPrice, 0)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrderNow = (e) => {
    e.preventDefault();
    dispatch(resetCart());
    navigate("/thank-you");
  };
  return (
    <Body>
      <div>
        <h2>Your Shopping Cart</h2>

        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.name,
                quantity: item.quantity,
                total: item.totalPrice,
                price: item.price,
              }}
            />
          ))}
        </ul>
        <p>Cart Total: ₹{cartTotal}</p>
        {cartItems.length > 0 ? (
          <button onClick={handleOrderNow} className="btn-primary btn">
            Order Now
          </button>
        ) : (
          <Link className="btn-primary btn" to="/products">Continue Shopping</Link>
        )}
      </div>
    </Body>
  );
}
