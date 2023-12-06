import React from "react";
import ProductItem from "../ProductItem";
import Body from "../Body";
import { useGetAllProductsQuery } from "../../services/apiServices";
export default function Products() {
  const { data, isLoading, isSuccess } = useGetAllProductsQuery();

  return (
    <Body>
      <div className="container">
        <div className="row">
          <div className="my-4">
            <h1>Products</h1>
          </div>
          {isLoading && <span>Loading</span>}
          {isSuccess &&
            data.map((product) =>
              product.isActive === 1 ? (
                <ProductItem
                  key={product.prodId}
                  id={product.prodId}
                  name={product.prodName}
                  price={product.price}
                  description={product.description}
                />
              ) : null
            )}
        </div>
      </div>
    </Body>
  );
}
