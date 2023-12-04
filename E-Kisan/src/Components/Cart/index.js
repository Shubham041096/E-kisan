import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../CartItem";
import Body from "../Body";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.totalPrice, 0)
  );
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
      </div>
    </Body>
  );
}
