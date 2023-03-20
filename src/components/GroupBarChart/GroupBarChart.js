import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';

const Bar = ({ x, y, width, height, color, onMouseEnter, onMouseLeave }) => {
  const radius = height === 0 ? 0 : width * 0.15;

  return (
    <path
      d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - 2 * radius}
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius}
      h-${width}
      z
    `}
      fill={color}
      onMouseEnter={(event) => onMouseEnter(event)}
      onMouseLeave={onMouseLeave}
    />
  );
};

export function GroupedBarChart({ data }) {
  const [tooltip, setTooltip] = useState(null);
  const axisBottomRef = useRef(null);
  const axisLeftRef = useRef(null);

  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = window.innerWidth / 1.5 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const labels = data.map(({ label }) => label);
  const sublabels = Object.keys(data[0].values);
  const values = data.map(({ values }) => values).flat();

  const scaleX = d3.scaleBand().domain(labels).range([0, width]).padding(0.2);
  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...values)])
    .range([height, 0]);
  const subscaleX = d3
    .scaleBand()
    .domain(sublabels)
    .range([0, scaleX.bandwidth()])
    .padding(0.05);

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX));
    }

    if (axisLeftRef.current) {
      d3.select(axisLeftRef.current).call(d3.axisLeft(scaleY));
    }
  }, [scaleX, scaleY]);

  return (
    <>
      <svg
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
          <g ref={axisLeftRef} />
          {data.map(({ label, values }, groupIndex) => (
            <g
              key={`rect-group-${groupIndex}`}
              transform={`translate(${scaleX(label)}, 0)`}
            >
              {values.map((value, barIndex) => (
                <Bar
                  key={`rect-${barIndex}`}
                  x={subscaleX(String(barIndex)) || 0}
                  y={scaleY(value)}
                  width={subscaleX.bandwidth()}
                  height={height - scaleY(value)}
                  color="teal"
                  onMouseEnter={(event) => {
                    setTooltip({
                      x: event.clientX,
                      y: event.clientY,
                      index: groupIndex,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              ))}
            </g>
          ))}
        </g>
      </svg>
      {tooltip !== null ? (
        <div className="tooltip" style={{ top: tooltip.y, left: tooltip.x }}>
          <span className="tooltip__title">{labels[tooltip.index]}</span>
          <table className="tooltip__table">
            <thead>
              <tr>
                <td>Standard</td>
                <td>Deluxe</td>
                <td>Luxury</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data[tooltip.index].values[0]}</td>
                <td>{data[tooltip.index].values[1]}</td>
                <td>{data[tooltip.index].values[2]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}
