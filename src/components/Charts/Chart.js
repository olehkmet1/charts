import React, { Component } from 'react';
import ChartLine from './ChartLine';

class Chart extends Component {

  componentDidMount() {
    console.log(this.props.chart);
  }

  render() {
    return (
      <div className="wrapper">
      <ChartLine />
      </div>
    );
  }
}

export default Chart;
