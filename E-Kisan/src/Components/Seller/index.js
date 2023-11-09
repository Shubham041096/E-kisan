import React from "react";
import "./index.css";

function Seller() {
  return (
    <div>
      <div className="container">
        <h1>Seller</h1>
        <div className="row mt-5">
          <h2>Product Details</h2>
          <div class="col-md-5 mb-4">
            <label for="validationCustom01" class="form-label">
              Product name
            </label>
            <input
              type="text"
              class="form-control"
              id="productName"
              required
              placeholder="Enter Product Name"
            />
          </div>
          <div class="col-md-5 mb-4">
            <label for="validationCustom01" class="form-label">
              Product Price
            </label>
            <input
              type="number"
              max={2000}
              min={0}
              class="form-control"
              id="productPrice"
              required
              placeholder="Enter Product Price"
            />
          </div>
          <div class="col-md-5">
            <label for="validationCustom01" class="form-label">
              Product Description
            </label>
            <textarea
              rows={4}
              class="form-control"
              id="productDescription"
              required
              placeholder="Enter Product Description"
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6 my-3">
            <button type="submit" className="btn btn-primary">
              Submit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Seller;
