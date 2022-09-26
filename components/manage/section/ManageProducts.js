import React, {useContext, useState} from 'react';
import {UserContext} from "@context/UserContext";
import useDebounce from "@hooks/useDebounce";
import InputDashSearch from "@components/shared/form/InputDashSearch";
import Link from "next/link";
import PlusIcon from "@icons/PlusIcon";
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
                    {/*<div className="btn-create-client mt-3 w-100 mt-md-0 ml-md-3">*/}
                    {/*    <Link href={'/dashboard/products/add-product'}>*/}
                    {/*        <a className="btn btn-create w-100">*/}
                    {/*            <i>*/}
                    {/*                <PlusIcon className="btn-create-icon" />*/}
                    {/*            </i>*/}
                    {/*            <span>Add New Product</span>*/}
                    {/*        </a>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </div>
            </div>
            <ProductTable search={debounceTerm} user={user} />
        </div>
    )
}

export default ManageProducts;