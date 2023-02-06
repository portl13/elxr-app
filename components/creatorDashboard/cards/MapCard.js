import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

function MapCard({ data }) {

  const [geoSelected, setGeoSelected] = useState(null)

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

  const handleMap = (geo) => {

    setGeoSelected({
      region: geo?.properties?.name,
      views: 30,
      perceint: 100,
    })
  }

  return (
    <div className="w-100 creator-dash-card p-0">
        <div className="row mx-0">
            <div className="col-12 p-4">
                <h5 className="mb-3 dash-card-title">REGIONAL ANALYTICS</h5>
            </div>
        </div>
        
        <div className="dash-map">
          <div style={{ width: '100%', maxWidth: '100%' }}>
            <ComposableMap height={450}>
              <ZoomableGroup zoom={1}>
                <Geographies geography="/features.json">
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography 
                        onClick={() => handleMap(geo)}
                        key={geo.rsmKey} 
                        geography={geo}
                        style={{
                          default: { fill: "#4C365A" },
                          hover: { fill: "#E34890" },
                          pressed: { fill: "#E34890" },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
        
        <div className="row mx-0 dash-map-headers">
          {headers.map((header) => (
            <div key={header.id} className="col-4 p-0">
              <span className="dash-header font-weight-700">{header.title}</span>
            </div>
          ))}
        </div>

        {geoSelected && (
          <div className="row mx-0 dash-map-item dash-item-border">
            <div className="col-4 p-0">
              <span className="dash-header">{geoSelected?.region}</span>
            </div>
            <div className="col-4 p-0">
              <span className="dash-header">{geoSelected?.views}</span>
            </div>
            <div className="col-4 p-0">
              <span className="dash-header">{geoSelected?.perceint}</span>
            </div>
          </div>    
        )}
    </div>
  );
}

export default MapCard;
