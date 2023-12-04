import React from "react";
import "./index.css";
import {
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "../../services/apiServices";

function Admin() {
  const { data, isSuccess, refetch } = useGetAllProductsQuery();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleApprove = async (e, prodId, email) => {
    e.preventDefault();
    const isActive = 1;
    try {
      const productData = await updateProduct({
        prodId,
        isActive,
      }).unwrap();
      refetch();

      console.log(productData);
    } catch (e) {
      console.log(e);
    }
  };

  const handleReject = async (e, prodId, email) => {
    e.preventDefault();
    const isActive = 2;
    try {
      const productData = await updateProduct({
        prodId,
        isActive,
      }).unwrap();
      refetch();

      console.log(productData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      <h1>Admin</h1>
      <div className="row mt-5">
        <h2>Product Approvals</h2>
        {isSuccess
          ? data.map((products) => (
              <div key={products.prodId} className="product-details mt-5">
                <div className="seller-name">
                  <p>{products.email}</p>
                </div>
                <div className="product-name">
                  <p>{products.prodName}</p>
                </div>
                <div className="approve-wrapper">
                  <button
                    onClick={(e) => handleApprove(e, products.prodId)}
                    className="btn btn-success mx-5"
                  >
                    Approve
                  </button>
                  <button
                    onClick={(e) => handleReject(e, products.prodId)}
                    className="btn btn-danger"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Admin;
