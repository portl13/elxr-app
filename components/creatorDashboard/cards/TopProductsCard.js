import React from "react";
import { PieChart, Pie, Cell } from 'recharts';

function Legend({ colors, data }){
    return(
        <div className="row mx-0 px-4 pb-4">
            {data &&
                data.length > 0 &&
                data.map((item, index) => (
                    <div key={index} className='col-4 p-0'>
                        <div className='row mx-0'>
                            <div className="col-4 p-0 d-flex align-items-start justify-centent-center">
                                <div 
                                    className="dash-legend-square"
                                    style={{
                                        backgroundColor: colors[index]
                                    }}
                                ></div>
                            </div>
                            <div className="col-8 px-2 d-flex align-items-start justify-centent-center">
                                <span className="dash-legend-text">{item?.name}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

function TopProductsCard({ data }) {

  const data01 = data.items;

  const COLORS = ['#17A2B8', '#63C2DE', '#E83E8D'];

  const colorsLegend = ['#51A0B5', '#7FC0DB', '#D34D8B'];

  return (
    <div className="w-100 creator-dash-card p-0">
        <div className="row m-0">
            <div className="col-12 p-4">
                <h5 className="dash-card-title m-0">TOP PRODUCTS</h5>
            </div>
        </div>


        <div className="row m-0 d-flex align-items-center justify-content-center">
            <PieChart width={300} height={300}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data01}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                >
                    {data01.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </div>

        <Legend data={data01} colors={colorsLegend} />
    </div>
  );
}

export default TopProductsCard;
