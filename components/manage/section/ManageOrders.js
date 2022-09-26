import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import OrderTable from "@components/dashboard/orders/OrderTable";
import InputDashSearch from "@components/shared/form/InputDashSearch";

function ManageOrders() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  return (
    <div className="container ">
      <div className="row d-flex  justify-content-between mb-5">
        <div className="col-12 col-md-6">
          <h4 className="list-nav-item-title pl-0">Orders</h4>
        </div>
        <div className="col-12 col-md-3">
          <InputDashSearch
            value={search}
            name={"search"}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <OrderTable search={debounceTerm} user={user} />
    </div>
  );
}

export default ManageOrders;
