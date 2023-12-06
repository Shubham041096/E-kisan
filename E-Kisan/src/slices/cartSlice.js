import { createSlice } from "@reduxjs/toolkit";

const initialCartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      items: [],
      totalQuantity: 0,
      changed: false,
      price: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      localStorage.setItem("cart", JSON.stringify(state));
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
        localStorage.setItem("cart", JSON.stringify(state));
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      const existingItem = state.items[existingItemIndex];
      if (!existingItem) {
        return state; // Item not found, return current state
      }
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(state));
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    resetCart: (state) => {
      state = {
        items: [],
        totalQuantity: 0,
        changed: false,
        price: 0,
      };
      localStorage.removeItem("cart");
      return state;
    },
  },
});

export const { resetCart, removeFromCart, addToCart, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
