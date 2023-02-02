import React from "react";
import { AreaChart, Area, XAxis, YAxis } from 'recharts';

function SalesTrendsCard({ data }) {

  const data02 = data.items

  return (
    <div className="w-100 creator-dash-card p-0">
        <div className="row m-0">
            <div className="col-12 p-4">
                <h5 className="dash-card-title m-0">Sales trends</h5>
            </div>
        </div>

        <div className="row mx-0 d-flex align-items-center justify-content-start pb-4">
          <AreaChart
            width={350}
            height={350}
            data={data02}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#FFE700" 
              strokeWidth={3} 
              fill="#FFE700" 
              dot={{ stroke: "#FFE700", strokeWidth: 2 }}
            />
          </AreaChart>
        </div>
    </div>
  );
}

export default SalesTrendsCard;
