import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../apiServices";
import { useDispatch } from "react-redux";

// import fruit from "./images/fruits.jpg"
export default function Loginpage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();
      console.log("Login successful", data);
      // Dispatch actions or perform tasks upon successful login
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col my-5">
          <div class="my-5" />
          <form
            className="row g-3 needs-validation my-4 "
            validate
            style={{ textAlign: "left" }}
          >
            <div>
              <h2>Login</h2>
            </div>
            <div className="col-md-5">
              <label for="inputEmail4" className="form-label ">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="col-md-5 mx-3">
              <label for="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*\d)(?=.*[aA-zZ]).{6,}"
                required
              />
            </div>

            <div className="col-7 my-4">
              <Link
                onClick={loginHandler}
                to="/products"
                className="btn btn-primary "
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Link>
            </div>
            <div className="Link my-1">
              <a href="#" class="link-primary ">
                Forgot Password
              </a>
              <a href="#" class="link-primary mx-5">
                New to Ekisan? Click here to Register
              </a>
            </div>
          </form>
        </div>
        <div className="col-md-6 my-5">
          <img
            class="animated bounce infinite"
            src="./image/cart15.PNG"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}
