import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';

const data: Serie[] = [
    {
        id: 'japan',
        data: [
            { x: 'plane', y: 286 },
            { x: 'helicopter', y: 247 },
            { x: 'boat', y: 110 },
            { x: 'train', y: 273 },
            { x: 'subway', y: 74 },
            { x: 'bus', y: 188 },
            { x: 'car', y: 281 },
            { x: 'moto', y: 28 },
            { x: 'bicycle', y: 62 },
            { x: 'horse', y: 12 },
            { x: 'skateboard', y: 45 },
            { x: 'others', y: 173 },
        ]
    },
    {
        id: 'france',
        data: [
            { x: 'plane', y: 178 },
            { x: 'helicopter', y: 207 },
            { x: 'boat', y: 285 },
            { x: 'train', y: 190 },
            { x: 'subway', y: 20 },
            { x: 'bus', y: 89 },
            { x: 'car', y: 92 },
            { x: 'moto', y: 131 },
            { x: 'bicycle', y: 56 },
            { x: 'horse', y: 4 },
            { x: 'skateboard', y: 252 },
            { x: 'others', y: 194 },
        ]
    }
]
const MyResponsiveLine = () => (
    <div style={{
        height: 400
    }}>
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'count',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'nivo' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel='y'
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    </div>
);

export default MyResponsiveLine;