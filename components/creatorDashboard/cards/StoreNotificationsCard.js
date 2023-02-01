import React from "react";
import Link from "next/link";
import DashboardCartIcon from "@icons/DashboardCart";

function StoreNotificationsCard({ data }) {

  return (
    <div className="w-100 creator-dash-card-shadow p-0">
        <div className="row m-0">
            <div className="col-12 p-4">
                <h5 className="dash-card-title m-0">STORE NOTIFICATIONS</h5>
            </div>
        </div>

        <div className="row mx-0 store-list mr-3">
            {data?.items &&
                data.items.length > 0 &&
                data.items.map((item, index) => (
                    <div 
                        key={index} 
                        className='row mx-0 mb-3'
                    >
                        <div className="col-2">
                            <DashboardCartIcon className='store-item-icon' />
                        </div>
                        <div className="col-10">
                            <span className="stote-item-text">
                                {`You have received an Order #${item?.order} for ${item?.channel}`}
                            </span>
                        </div>
                    </div>
            ))}
        </div>

        <div className="row mx-0 p-4">
            <Link href='#'>
                <button className="store-button">
                    See all
                </button>
            </Link>
        </div>
    </div>
  );
}

export default StoreNotificationsCard;
