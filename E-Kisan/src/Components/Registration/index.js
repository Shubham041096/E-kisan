import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../services/apiServices";
import { useSelector } from "react-redux";

export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [role, setRole] = useState("");
  const [roleName, setroleName] = useState("");

  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleSelectChange = (event) => {
    setRole(event.target.value);
    if (event.target.value === "2") {
      setroleName("ROLE_SELLER");
    } else if (event.target.value === "1") {
      setroleName("ROLE_BUYER");
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await register({
        firstName,
        lastName,
        email,
        password,
        contactNo,
        role,
        roleName,
      }).unwrap();

      if (data) {
        alert("Registered Successfully");
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div>
              <div className="container my-4" style={{ textAlign: "left" }}>
                <h2 className="text-left">Register</h2>
              </div>
              <form
                onSubmit={registerHandler}
                className="row g-3 needs-validation"
                style={{ textAlign: "left" }}
              >
                <div className="col-md-5">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    value={firstName}
                    required
                    placeholder="Enter your first name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-5 mx-4">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    value={lastName}
                    required
                    placeholder="Enter your last name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <div className="col-md-5">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    required
                    placeholder="example@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-5 mx-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    pattern="(?=.*\d)(?=.*[aA-zZ]).{6,}"
                    required
                    placeholder="example123"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-5 mx-6 my-3">
                  <label className="form-label">Contact No</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactNo"
                    value={contactNo}
                    data-validation="number"
                    required="required"
                    placeholder="10-digit number"
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                </div>
                <div className="select col-8">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleSelectChange}
                    value={role}
                  >
                    <option defaultValue="0">Please Select the Role</option>
                    <option value="1">Buyer</option>
                    <option value="2">Seller</option>
                  </select>
                </div>
                <div className="col-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      //value=""
                      id="invalidCheck"
                      required
                    />
                    <label className="form-check-label">
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>
                <div className="col-7 my-3">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                  <Link to="/login" className="link-primary mx-4">
                    Already a user
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="my-5"></div>

            <img
              alt="cart"
              src="./image/cart11.PNG"
              width="90%"
              height="90%"
              style={{}}
            />
          </div>
        </div>
      </div>
    </>
  );
}
