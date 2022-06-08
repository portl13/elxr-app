import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getOrdersDetailsById } from "../../pages/api/channel.api";
import { useRouter } from "next/router";
import OrderView from "./OrderView";
import Loader from "../loader";
import { getOrdersStatus } from "../../pages/api/channel.api";


function OrderDetails({ handleRedirect }) {
    const { user } = useContext(UserContext);
    const [orderList, setOrderResult] = useState("")
    const [status, setStatus] = useState();
    const [showLoader, setShowLoader] = useState(false);
    const [show, setShow] = useState(false);
    const router = useRouter();
    const query = router.query;
    const id = parseInt(query.orders)

    useEffect(() => {
        if (id) {
            fetchOrderView(id);
        }
    }, [id]);
    const fetchOrderView = (order_id) => {
        getOrdersDetailsById(user, order_id).then((res) => {

            setOrderResult(res.data);
        });
    };
    const updateStatus = () => {
        const formdata = {
            status
        }
        setShowLoader(true);
        setShow(true);
        getOrdersStatus(user, id, formdata).then((res) => {
            setShowLoader(false);
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, [1500]);
            orderList.status = status
            setOrderResult(orderList)
        })

    }

    return (
        <> {orderList.length !== 0 && (
            <OrderView orderList={orderList}
                updateStatus={updateStatus}
                showLoader={showLoader}
                show={show}
                setStatus={setStatus}
                status={status}
                handleRedirect={handleRedirect} />
        )
        }

        </>
    )
}
export default OrderDetails