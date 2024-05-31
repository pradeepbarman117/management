import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

export default function BarChartGraph() {
  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        {...chartSetting}
        colors={['#1976d2']}
        slotProps={{
          bar: {
            clipPath: `inset(0px round 10px 10px 0px 0px)`,
          },
          legend: {hidden: true},
        }}
      />
    </div>
  );
}

const dataset = [
  [2, 'Jan'],
  [4, 'Feb'],
  [7, 'Mar'],
  [5, 'Apr'],
  [1, 'May'],
  [2, 'June'],
  [6, 'July'],
  [4, 'Aug'],
  [3, 'Sept'],
  [5, 'Oct'],
  [6, 'Nov'],
  [3, 'Dec'],
].map(([projects, month]) => ({
  projects,
  month,
}));

const valueFormatter = (value) => `${value}`;

const chartSetting = {
  series: [{ dataKey: 'projects', label: 'Projects Handled', valueFormatter }],
  height: 300,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
  xAxis: [
    {
      scaleType: 'band',
      dataKey: 'month', // Define month names as the dataKey for the x-axis
      label: 'Month', // Label for the x-axis
    },
  ],
};
