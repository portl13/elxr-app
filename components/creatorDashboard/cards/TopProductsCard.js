import React from "react";
import { PieChart, Pie, Legend, Cell } from 'recharts';

function TopProductsCard({ data }) {

  const chart = data.items;

  const COLORS = ['#51A0B5', '#7FC0DB', '#D34D8B'];

  return (
    <div className="w-100 creator-dash-card-shadow p-0">
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
                    data={chart}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                >
                    {chart.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                {/* <Legend iconType='square'/> */}
            </PieChart>
        </div>
    </div>
  );
}

export default TopProductsCard;
