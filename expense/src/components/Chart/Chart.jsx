import ChartBar from '../ChartBar/ChartBar';

import './Chart.css';

const Chart = ({ dataPoints }) => {
  const totalMax = Math.max(...dataPoints.map(dataPoint => dataPoint.value));

  return (
    <div className="chart">
      {dataPoints.map(dataPoint => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMax}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
