import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/apiServices";
import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
