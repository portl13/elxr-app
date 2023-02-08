import React, { useEffect, useRef, useState } from "react";
import { AreaChart, Area, XAxis, YAxis } from 'recharts';

function SalesTrendsCard({ data }) {

  const data02 = data.items

  const ref = useRef()
  const [width, setWitdth] = useState(350)
  const [height, setHeight] = useState(350)

  useEffect(() => {
    if(ref?.current){
      setWitdth(ref.current?.clientWidth - 50)
      setHeight(ref.current?.clientHeight)
    }
  }, [ref])

  return (
    <div className="w-100 creator-dash-card p-0">
        <div className="row m-0">
            <div className="col-12 p-4">
                <h5 className="dash-card-title m-0">Sales trends</h5>
            </div>
        </div>

        <div className="row mx-0 d-flex align-items-center justify-content-start pb-4" ref={ref}>
          <AreaChart
            width={width}
            height={height}
            data={data02}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#FFE700" 
              strokeWidth={3} 
              fill="#322908" 
              dot={{ stroke: "#FFE700", strokeWidth: 2 }}
            />
          </AreaChart>
        </div>
    </div>
  );
}

export default SalesTrendsCard;
