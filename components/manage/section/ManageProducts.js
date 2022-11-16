import React, {useContext, useState} from 'react';
import {UserContext} from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import ProductTable from "@components/dashboard/product/ProductTable";

function ManageProducts() {
    const { user } = useContext(UserContext)
    const [search, setSearch] = useState('')
    const debounceTerm = useDebounce(search, 500)
    return (
        <div className="container ">
            <div className="d-flex  justify-content-between flex-column flex-md-row">
                <div>
                    <h2 className="list-nav-item-title pl-0">Products</h2>
                </div>
                <div className="d-flex justify-content-between align-items-center flex-column flex-md-row">
                    <InputDashSearch
                        value={search}
                        name={'search'}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <ProductTable search={debounceTerm} user={user} />
        </div>
    )
}

export default ManageProducts;