import React from 'react'

function TopReferrersCard({ data }) {
  return (
    <div className="w-100 creator-dash-card p-0">
      <div className="row m-0">
        <div className="col-12 p-4">
          <h5 className="dash-card-title m-0">TOP REFERRERS</h5>
        </div>
      </div>

      <div className="row mx-0 dash-card-headers">
        <span className="dash-header">Referrer</span>
        <span className="dash-header-count">Count</span>
      </div>
      <div className={`row mx-0 dash-light-item dash-item-border`}>
        <div className="col-10 p-0">
          <span className="dash-item-url">No referret yet ..!!!</span>
        </div>
        <div className="col-2 p-0 d-flex align-items-center justify-content-end">
          <span className="dash-header-count">0</span>
        </div>
      </div>
      {/*             <div 
              key={index} 
              className={`row mx-0 ${
                index % 2 === 0 ? 'dash-light-item' : 'dash-item'
              } ${index === data.items.length - 1 ? 'dash-item-border' : ''}
            `}>
              <div className="col-10 p-0">
                <span className="dash-item-url">{item?.url}</span>
              </div>
              <div className="col-2 p-0 d-flex align-items-center justify-content-end">
                <span className="dash-header-count">{item.count}</span>
              </div>
            </div> */}
    </div>
  )
}

export default TopReferrersCard
