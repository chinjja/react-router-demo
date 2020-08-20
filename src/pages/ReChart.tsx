import React from 'react';
import { LineChart, XAxis, Tooltip, CartesianGrid, Line, YAxis, ResponsiveContainer, Legend } from 'recharts';

export default class MyReChart extends React.Component {
    render() {
        const data = [
            { name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
            { name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
            { name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
            { name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
            { name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
            { name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
            { name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
            { name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
            { name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
            { name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
          ];
        return (
            <ResponsiveContainer
                width='100%'
                height={400}
            >
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                    <XAxis dataKey='name' tickCount={10} />
                    <YAxis yAxisId={0} orientation='left' />
                    <YAxis yAxisId={1} orientation='right' />
                    <Tooltip />
                    <CartesianGrid stroke='#e0e0e0' />
                    <Line dataKey='uv' stroke='#ff7300' yAxisId={0} />
                    <Line type='monotone' dataKey='pv' stroke='#73ff00' yAxisId={1} />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        )
    }
}