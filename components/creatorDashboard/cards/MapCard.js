import React from "react";

function MapCard({ data }) {

  const headers = [
    {
      title: 'Region',
      id: 'region'
    },
    {
      title: 'Views',
      id: 'views'
    },
    {
      title: '0%',
      id: '0%'
    }
  ]

  return (
    <div className="w-100 creator-dash-card p-0">
        <div className="row mx-0">
            <div className="col-12 p-4">
                <h5 className="mb-3 dash-card-title">REGIONAL ANALYTICS</h5>
            </div>
        </div>

        <div className="row mx-0" style={{ height: 300 }}>
     
        </div>

        <div className="row mx-0 dash-map-headers">
          {headers.map((header) => (
            <div key={header.id} className="col-4 p-0">
              <span className="dash-header font-weight-700">{header.title}</span>
            </div>
          ))}
        </div>

        {data?.items &&
            data.items.length > 0 &&
            data.items.map((item) => (
              <div className="row mx-0 dash-map-item dash-item-border">
                <div className="col-4 p-0">
                  <span className="dash-header">{item?.region}</span>
                </div>
                <div className="col-4 p-0">
                  <span className="dash-header">{item?.views}</span>
                </div>
                <div className="col-4 p-0">
                  <span className="dash-header">{item?.perceint}</span>
                </div>
              </div>    
          ))
        }
    </div>
  );
}

export default MapCard;
