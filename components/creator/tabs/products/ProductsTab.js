import React, { useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import ProductCard from "@components/creator/cards/ProductCard";
import usePortlApi from "@hooks/usePortlApi";

const productsUrl = `${process.env.courseUrl}/wcfmmp/v1/products/?id=`;

function ProductsTab({ creator_id }) {

  // const { data: products } = useSWR(`${productsUrl}${creator_id}&per_page=12`, getFetchPublic)
  const [page, setPage] = useState(1);
  const { data: products, isLoading } = usePortlApi(
    `channel/product/?id=${creator_id}&page=${page}&per_page=12`
  );
  console.log(
    "🚀 ~ file: ProductsTab.js ~ line 15 ~ ProductsTab ~ products",
    products
  );


  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">PRODUCTS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {products &&
        products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      {products && products.length === 0 && (
        <h3 className="col display-4">You have not created any product yet</h3>
      )}
    </div>
  );
}

export default ProductsTab;
