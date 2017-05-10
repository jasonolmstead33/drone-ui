import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';


import './stacked_bar_chart.less';

import  '../../node_modules/react-vis/main.css';


export default
class StackedBarChart extends React.Component {
  render() {
    const {data} = this.props;

    return (
      <XYPlot
        xType="ordinal"
        width={300}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          className="vertical-bar-series-example"
          data={data}/>
      </XYPlot>
    );
  }
}
