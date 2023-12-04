import React from "react";
import "./index.css";
import {
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../services/apiServices";
import Body from "../Body";

function Admin() {
  const { data, isSuccess, refetch } = useGetAllProductsQuery();

  const [updateProduct] = useUpdateProductMutation();

  const handleApprove = async (e, prodId) => {
    e.preventDefault();
    const isActive = 1;
    try {
      const productData = await updateProduct({
        prodId,
        isActive,
      }).unwrap();

      if (productData) {
        alert("Product approved");
      }
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async (e, prodId) => {
    e.preventDefault();
    const isActive = 2;
    try {
      const productData = await updateProduct({
        prodId,
        isActive,
      }).unwrap();

      if (productData) {
        alert("Product Rejected");
      }
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Body>
      <div className="container">
        <h1>Admin</h1>
        <div className="row mt-6">
          <div className="col-6">
            <h2>Approved Products</h2>
            <div className="mt-5 seller-product-list">
              <div className="product-list">
                <p>Seller ID</p>
                <p>Product Name</p>
              </div>

              {isSuccess ? (
                data.map((product) =>
                  product.isActive === 1 ? (
                    <div key={product.prodId} className="product-details mt-5">
                      <div className="seller-name">
                        <p>{product.email}</p>
                      </div>
                      <div className="product-name">
                        <p>{product.prodName}</p>
                      </div>
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
                <p>Seller ID</p>
                <p>Products</p>
                <p>Approval</p>
              </div>
              {isSuccess ? (
                data.map((product) =>
                  product.isActive === 0 ? (
                    <div key={product.prodId} className="product-details mt-5">
                      <div className="seller-name">
                        <p>{product.email}</p>
                      </div>
                      <div className="product-name">
                        <p>{product.prodName}</p>
                      </div>
                      <div className="approve-wrapper">
                        <button
                          onClick={(e) => handleApprove(e, product.prodId)}
                          className="btn btn-success mx-5"
                        >
                          Approve
                        </button>
                        <button
                          onClick={(e) => handleReject(e, product.prodId)}
                          className="btn btn-danger"
                        >
                          Reject
                        </button>
                      </div>
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
                <p>Seller ID</p>
                <p>Product Name</p>
              </div>
              {isSuccess ? (
                data.map((product) =>
                  product.isActive === 2 ? (
                    <div key={product.prodId} className="product-details mt-5">
                      <div className="seller-name">
                        <p>{product.email}</p>
                      </div>
                      <div className="product-name">
                        <p>{product.prodName}</p>
                      </div>
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

export default Admin;
