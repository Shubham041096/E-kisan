import React from "react";
import "./App.css";
import Registration from "./Components/Registration";
import Aboutus from "./Components/Aboutus";
import Loginpage from "./Components/Loginpage";
import { Routes, Route } from "react-router-dom";
import Payment from "./Components/Payment";
import Thankyou from "./Components/Thankyou";
import Dashboard from "./Components/Dashboard";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Seller from "./Components/Seller";
import Admin from "./Components/Admin";
import Adminroutes from "./protectedroutes/Adminroutes";
import Sellerroutes from "./protectedroutes/Sellerroutes";
import Userroutes from "./protectedroutes/Userroutes";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/about" element={<Aboutus />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/login" element={<Loginpage />} />

          <Route path="" element={<Adminroutes />}>
            <Route exact path="/admin" element={<Admin />} />
          </Route>

          <Route path="" element={<Sellerroutes />}>
            <Route exact path="/seller" element={<Seller />} />
          </Route>

          <Route path="" element={Userroutes}>
            <Route exact path="/payment" element={<Payment />} />
            <Route exact path="/thankyou" element={<Thankyou />} />
          </Route>
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
