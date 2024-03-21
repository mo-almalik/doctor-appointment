import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as chartJS} from "chart.js/auto"

const AdminChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [
          25,50,20,50,30
        ],
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };


  return (
    <div className='w-full h-full'>
      <Line  data={data}  />
    </div>
  );
}

export default AdminChart;
