import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../services/apiServices";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import Body from "../Body";

// import fruit from "./images/fruits.jpg"
export default function Loginpage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      if (userInfo.roleName === "ROLE_SELLER") {
        navigate("/seller");
      }
      if (userInfo.roleName === "ROLE_BUYER") {
        navigate("/products");
      }
      if (userInfo.roleName === "ROLE_ADMIN") {
        navigate("/admin");
      }
    }
  }, [userInfo, navigate]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...data }));
      if (data.roleName === "ROLE_SELLER") {
        navigate("/seller");
      }
    } catch (error) {
      if (error.originalStatus === 500) {
        alert("Invalid Credentials");
      }
      // console.error("Error:", error.originalStatus);
    }
  };

  return (
    <Body>
      <div className="container">
        <div className="row">
          <div className="col my-5">
            <div className="my-5" />
            <form
              className="row g-3 needs-validation my-4 "
              style={{ textAlign: "left" }}
            >
              <div>
                <h2>Login</h2>
              </div>
              <div className="col-md-5">
                <label className="form-label ">Email</label>
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
                <label className="form-label">Password</label>
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
                <button
                  onClick={loginHandler}
                  className="btn btn-primary "
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
              <div className="Link my-1">
                {/* <a href="#" className="link-primary ">
                Forgot Password
              </a> */}
                <Link to="/register" className="link-primary mx-5">
                  New to Ekisan? Click here to Register
                </Link>
              </div>
            </form>
          </div>
          <div className="col-md-6 my-5">
            <img
              alt="cart"
              className="animated bounce infinite"
              src="./image/cart15.PNG"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </Body>
  );
}
