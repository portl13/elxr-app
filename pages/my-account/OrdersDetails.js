import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useRouter } from "next/router";
import { getOrdersViewById } from "../api/channel.api";
import { getOrdersNotes, addImage } from "../api/channel.api";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { OrdersNotes } from "../api/channel.api";
import { TIMEOUT } from "../../utils/constant";
import { useAlert } from "react-alert";
import Loader from "../../components/loader";
import Router from 'next/router'





function getDateSuffix(date) {
    const dt = moment(date).date().toString().slice(-1);
    if (dt === '1') {
        return 'st';
    }
    else if (dt === '2') {
        return 'nd';
    }
    else if (dt === '3') {
        return 'rd';
    }
    else {
        return 'th';
    }
}


function Ordersdetails({ handleRedirect }) {
    const alert = useAlert();
    const { user } = useContext(UserContext);
    const [ordersResult, setOrdersResult] = useState()
    const [orderNotes, setOrderNotes] = useState()
    const [note, setNotes] = useState();
    const [showLoaders, setShowLoaders] = useState(false);
    const [image, setImage] = useState();
    const router = useRouter();
    const query = router.query;
    const id = parseInt(query.nav)


    useEffect(() => {
        if (id) {
            fetchOrdersView(id);
        }
    }, [id]);
    const fetchOrdersView = (id) => {
        getOrdersViewById(user, id).then((res) => {
            setOrdersResult(res.data.data);
        });
    };

    useEffect(() => {
        if (id) {
            fetchOrderNotes(id);
        }
    }, [id]);
    const fetchOrderNotes = (id) => {
        getOrdersNotes(user, id).then((res) => {
            setOrderNotes(res.data.data);
        });
    };

    // const AddNotes = (checkValue) => {
    //     if (checkError(checkValue)) {
    //         const formData = {
    //             note: note,
    //             note_file: resultUrl
    //         }
    //         setShowLoaders(true);
    //         OrdersNotes(user, id, formData).then((res) => {
    //             alert.success("Order notes created successfully.", TIMEOUT);
    //             setNotes("");
    //             setShowLoaders(false);
    //             fetchOrderNotes(id)

    //         })
    //     }
    // }
    const checkError = () => {
        let checkValue = true;
        if (checkValue && !note) {
            alert.error("Please add note before submit.", TIMEOUT);
            checkValue = false;
        }
        return checkValue;
    };
    function onFormSubmit(e, checkValue) {
        if (checkError(checkValue)) {
            e.preventDefault();
            setShowLoaders(true);
            fileUpload(image).then((res) => {
                alert.success("Order notes created successfully.", TIMEOUT);
                setNotes("");
                //setImage("")
                setShowLoaders(false);
                fetchOrderNotes(id)

            });
        }
    }
    function fileUpload(file) {
        const formData = new FormData();
        formData.append("note_file", file);
        formData.append("note", note);
        return OrdersNotes(user, id, formData);
    }

    return (
        <>
            <div className="account-subscription-panel fx-d">
                <h3>
                    View Order
                    <span> Order #<em>{ordersResult?.id}</em> was placed on <em>{moment(ordersResult?.date).format("MMMM DD, YYYY")}</em>
                        and is currently <em>{ordersResult?.status.charAt(0).toUpperCase() + ordersResult?.status.slice(1)}</em>.</span>
                </h3>


                <div className="status-wrapper">
                    <h2>Order details</h2>
                    <div className="table-ui">
                        <div className="related-col-head">
                            <div className="col-view-1"></div>
                            <div className="col-view-2">PRODUCT</div>
                            <div className="col-view-3">QTY</div>
                            <div className="col-view-4">TOTAL</div>
                        </div>
                        {ordersResult && ordersResult.order_details.map((item) => {
                            return (
                                <div className="related-coloun-tag">
                                    <div className="col-view-1">
                                        <img src={item.image} alt="image" />
                                    </div>
                                    <div className="col-view-2">
                                        <a className="product-name" onClick={() => Router.push('/subscription-detail?id=51779')}>{ordersResult.order_details.map((d) => d.name)}</a>{" "}

                                        <div>
                                            SKU:  {item.sku ? <span> {item.sku} </span> : "N/A"
                                            }
                                        </div>
                                    </div>


                                    <div className="col-view-3"><span>{item.quantity}</span></div>
                                    <div className="col-view-4">
                                        <span>${item.total}.00</span>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="subtotal-ui">
                        <div className="subtotal-tag">
                            SUBTOTAL: <span> ${ordersResult?.sub_total}.00 </span>
                        </div>
                        <div className="subtotal-tag">
                            TOTAL: <span> ${ordersResult?.total}.00 </span>
                        </div>
                    </div>
                </div>

                <div className="status-wrapper">
                    <h2>Add your note</h2>
                    <div className="upload-panel">
                        <div className="data-panel-12">
                            <div className="left-panel">Add note <span className="req"> *</span></div>
                            <div className="right-panel">
                                <textarea
                                    type="text"
                                    value={note}
                                    onChange={(e) => setNotes(e.target.value)}
                                    maxLength={1000}
                                ></textarea>
                            </div>
                        </div>
                        <div className="data-panel-12">
                            <div className="left-panel">Upload File</div>
                            <div className="right-panel">
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}
                                />

                            </div>
                        </div>
                        <div className="data-panel-12">
                            <button className="submit-button" onClick={(e) => onFormSubmit(e)}>{showLoaders && <Loader />}Submit</button>
                        </div>
                    </div>
                </div>

                <div className="status-wrapper">
                    <h2>Order updates</h2>
                    <ol>
                        {orderNotes && orderNotes.map((item) => {
                            return (
                                <li>
                                    <div className="main-tag">
                                        <div className="meta"><span dangerouslySetInnerHTML={{ __html: item.note }}></span></div>
                                        <div className="description-text">
                                            {moment(item.date_created).format("dddd")} {moment(item.date_created).format(`MMMM DD[${getDateSuffix(item.date_created)}], YYYY [at] hh:mm a`)}
                                        </div>
                                    </div>
                                </li>

                            )
                        })
                        }
                    </ol>
                </div>

                <div className="status-wrapper">
                    <h2>Related subscriptions</h2>
                    <div className="table-ui">
                        <div className="related-col-head">
                            <div className="col-related-1">SUBSCRIPTION</div>
                            <div className="col-related-2">STATUS</div>
                            <div className="col-related-3">NEXT PAYMENT	</div>
                            <div className="col-related-4">TOTAL</div>
                            <div className="col-related-5"></div>
                        </div>
                        {ordersResult && ordersResult.subscriptions.map((item) => {
                            return (
                                <div className="related-coloun-tag">
                                    <div className="col-related-1">
                                        <a href="#"># {item.id} </a>
                                    </div>
                                    <div className="col-related-2">
                                        <span> {item.status}</span>
                                    </div>
                                    <div className="col-related-3">
                                        {moment(item.next_payment).fromNow()}
                                    </div>
                                    <div className="col-related-4">
                                        {item.total}
                                    </div>
                                    <div className="col-related-5">
                                        <a className="view-button" onClick={() => handleRedirect("subscriptions", ordersResult?.subscriptions.map((d) => d.id))}>View</a>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>

                <div className="status-wrapper">
                    <h2>Billing address</h2>
                    <div className="address-panel">
                        <div className="address-tag">
                            <span> {ordersResult?.billing.first_name} {ordersResult?.billing.last_name}</span>
                            <span> {ordersResult?.billing.company}</span>
                            <span> {ordersResult?.billing.address_1}</span>
                            <span> {ordersResult?.billing.city}, {ordersResult?.billing.state} {ordersResult?.billing.postcode}</span>
                        </div>
                        <div className="contact-tag">
                            <span> <FontAwesomeIcon icon={faPhone} /> {ordersResult?.billing.phone}</span>
                            <span> <FontAwesomeIcon icon={faEnvelope} /> {ordersResult?.billing.email}</span>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Ordersdetails;