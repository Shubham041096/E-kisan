import React from "react";
import "./index.css"

function Admin() {
  return (
    <div className="container">
      <h1>Admin</h1>
      <div className="row mt-5">
        <h2>Product Approvals</h2>
        <div className="product-details mt-5">
          <div className="seller-name">
            <p>Seller1</p>
          </div>
          <div className="product-name">
            <p>Onions</p>
          </div>
          <div className="approve-wrapper">
            <button className="btn btn-success mx-5">Approve</button>
            <button className="btn btn-danger">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
