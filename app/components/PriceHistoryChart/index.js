// @flow strict
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import React from 'react';

export default function PriceHistoryChart(props) {
  return (
    <Chart
      height={400}
      data={props.data}
      autoFit
      onAxisLabelClick={console.log}
      scale={{
        time: {
          type: 'timeCat',
          range: [0, 1],
          tickCount: 4,
        },
      }}
    >
      <Legend />
      <Axis name="date" />
      <Axis
        name="value"
        position="right"
        label={{
          formatter: (val) => `${val}`,
        }}
      />
      <Tooltip
        crosshairs={{
          type: 'y',
        }}
        itemTpl={`
              <tr data-index={index}>'
                <td><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span></td>
                <td>{name}</td>
                <td>{value}</td>
              </tr>
           `}
      >
        {(title, items) => {
          return (
            <table>
              <thead>
                <tr>
                  <th>&nbsp;</th>
                  <th>name</th>
                  <th>value</th>
                </tr>
              </thead>
              <tbody className="g2-tooltip-list"></tbody>
            </table>
          );
        }}
      </Tooltip>
      <Geom
        type="line"
        position="date*value"
        size={2}
        color={'value'}
        // shape={'smooth'}
      />
    </Chart>
  );
}
