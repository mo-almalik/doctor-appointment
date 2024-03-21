import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import api from '../../services/api.js';
import { useError } from '../../Context/error.js';

export default function DoctorChart() {
    const { handleError } = useError();
  const [loading, setLoading] = useState(false);
  const [counts, setCounts] = useState({});
  const { error } = useError();

  async function getCount() {
    setLoading(true);
    const data = await api.get("/analytics/doc-count").catch((e) => {
      handleError(e.response.data.message);
    });
    if (data) {
      setCounts(data?.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    getCount();
  }, []);

 console.log(counts);
  return (
    <div className='w-full h-full'>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={counts}
                    margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                >
                    <Legend verticalAlign="top" />
                  
                    <Area type="bump" dataKey="count" name="الحجوزات" stroke="#8884d8" fill="#8884d8" />
                   
                    <Tooltip
                        contentStyle={{ backgroundColor: "transparent", border: "none" }}
                        formatter={(value, name, props) => [ `${props.payload._id} ` ,  value]}
                    />
                    
                </AreaChart>
            </ResponsiveContainer>
        </div>
  )
}
