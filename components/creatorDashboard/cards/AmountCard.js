import React from "react";

function AmountCard({ data }) {

  return (
    <div className="w-100 creator-dash-card">
        <div className="row mx-0">
            <div className="col-12">
                <h5 className="mb-3 dash-card-title">{data?.title}</h5>
            </div>
        </div>

        <div className="row mx-0">
            {data?.items &&
                data.items.length > 0 &&
                data.items.map((item, index) => (
                    <div key={index} className={`col-3 ${
                        index === data.items.length - 1 ? '' : 'dash-card-item'
                    }`}>
                        <h6 className="mb-1 dash-card-subtitle">{item?.title}</h6>
                        <span className="dash-card-amount">{item?.amount}</span>
                        <br />
                        <span className="dash-card-time">{item.time}</span>
                    </div>
                ))
            }
        </div>
    </div>
  );
}

export default AmountCard;
