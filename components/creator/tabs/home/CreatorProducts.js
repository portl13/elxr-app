import React from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import ProductCard from "@components/creator/cards/ProductCard";

function CreatorProducts({ products, isLoading }) {
  if (products && products.length === 0) {
    return "";
  }

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">PRODUCTS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {products &&
        products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
}

export default CreatorProducts;
