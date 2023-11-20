import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { selectCartTotal } from "../store";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector(selectCartTotal);
  return (
    <div>
      <h1>
        <h2>Your Shopping Cart</h2>
      </h1>
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
    </div>
  );
}
