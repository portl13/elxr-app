import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import ProductTable from "@components/dashboard/product/ProductTable";
import Link from "next/link";

function ManageProducts() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  return (
    <div className="container ">

         <div className="row d-flex  justify-content-between mb-5">
          <div className="col-12 col-md-6">
            <h4 className="list-nav-item-title pl-0">Products</h4>
          </div>
          <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
          </div>
          <div className="col-12 col-md-auto mt-4 mt-md-0">
          <Link href={"/create/add-product"}>
          <a className={"btn btn-primary btn-create w-100"}>Create a product</a>
        </Link>
          </div>
        </div>

      <ProductTable search={debounceTerm} user={user} />
    </div>
  );
}

export default ManageProducts;
