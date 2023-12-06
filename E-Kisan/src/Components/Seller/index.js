import React, { useState } from "react";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../services/apiServices";
import { useSelector } from "react-redux";
import "./index.css";
import Body from "../Body";

function Seller() {
  const [prodName, setprodName] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { email } = useSelector((state) => state.auth.userInfo);

  const { data, isSuccess, refetch } = useGetProductsQuery(email);
  

  const createProductHandler = async (e) => {
    e.preventDefault();

    try {
      const productData = await createProduct({
        prodName,
        price,
        quantity,
        email,
      }).unwrap();

      if (productData) {
        alert("Product added");
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Body>
      <div className="container seller">
        <div className="row">
          <h1>Seller</h1>
          <form onSubmit={createProductHandler}>
            <div className="row mt-5">
              <h2>Product Details</h2>
              <div className="col-md-5 mb-4">
                <label className="form-label">Product name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  name="prodName"
                  value={prodName}
                  onChange={(e) => {
                    setprodName(e.target.value);
                  }}
                  required
                  placeholder="Enter Product Name"
                />
              </div>
              <div className="col-md-5 mb-4">
                <label className="form-label">Product Price</label>
                <input
                  type="number"
                  max={2000}
                  min={0}
                  className="form-control"
                  id="productPrice"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                  required
                  placeholder="Enter Product Price"
                />
              </div>
              <div className="col-md-5">
                <label className="form-label">Product Quantity</label>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  id="productDescription"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => {
                    setquantity(e.target.value);
                  }}
                  required
                  placeholder="Enter Product Quantity"
                />
              </div>
            </div>
            <input hidden type="text" name="email" defaultValue={email} />
            <div className="row justify-content-center">
              <div className="col-6 my-3">
                <button type="submit" className="btn btn-primary">
                  {isLoading ? "Loading..." : "Submit Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="row mt-6">
          <div className="col-6">
            <h2>Approved Products</h2>
            <div className="mt-5 seller-product-list">
              <div className="product-list">
                <p>Product Name</p>
                <p>Price</p>
                <p>Quantity</p>
              </div>
              {isSuccess ? (
                data.map((products) =>
                  products.isActive === 1 ? (
                    <div className="product-list" key={products.prodId}>
                      <p>{products.prodName}</p>
                      <p>{products.price}</p>
                      <p>{products.quantity}</p>
                    </div>
                  ) : null
                )
              ) : (
                <p>None</p>
              )}
            </div>
          </div>
          <div className="col-6">
            <h2>Pending Products</h2>
            <div className="mt-5 seller-product-list">
              <div className="product-list">
                <p>Product Name</p>
                <p>Price</p>
                <p>Quantity</p>
              </div>
              {isSuccess ? (
                data.map((products) =>
                  products.isActive === 0 ? (
                    <div className="product-list" key={products.prodId}>
                      <p>{products.prodName}</p>
                      <p>{products.price}</p>
                      <p>{products.quantity}</p>
                    </div>
                  ) : null
                )
              ) : (
                <p>None</p>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <h2>Rejected Products</h2>
            <div className="seller-product-list">
              <div className="product-list">
                <p>Product Name</p>
                <p>Price</p>
                <p>Quantity</p>
              </div>
              {isSuccess ? (
                data.map((products) =>
                  products.isActive === 2 ? (
                    <div className="product-list" key={products.prodId}>
                      <p>{products.prodName}</p>
                      <p>{products.price}</p>
                      <p>{products.quantity}</p>
                    </div>
                  ) : null
                )
              ) : (
                <p>None</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Body>
  );
}

export default Seller;
