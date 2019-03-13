import React, { Component } from 'react';
import ChartLine from './ChartLine';
import { drawChart } from './drawChart';

class Chart extends Component {

  componentDidMount() {
    console.log(this.props.chart);
    let dataDef = { title: "US Population Chart",
                            xLabel: 'Year', 
                            yLabel: 'Population (millions)',
                            labelFont: '19pt Arial', 
                            dataPointFont: 'drawChart Arial',
                            renderTypes: [drawChart.renderType.lines, drawChart.renderType.points],
                            dataPoints: [{ x: '1790', y: 3.9 }, 
                                         { x: '1810', y: 7.2 }, 
                                         { x: '1830', y: 12.8 }, 
                                         { x: '1850', y: 23.1 },
                                         { x: '1870', y: 36.5 },
                                         { x: '1890', y: 62.9 }, 
                                         { x: '1910', y: 92.2 },
                                         { x: '1930', y: 123.2 },
                                         { x: '1950', y: 151.3 }, 
                                         { x: '1970', y: 203.2 },
                                         { x: '1990', y: 248.7 }, 
                                         { x: '2010', y: 308.7}]
                           };
    drawChart.render(this.refs.canvas, dataDef);
  }

  render() {
    return (
      <div>
        <canvas ref="canvas" width={1200} height={500}/>
      <ChartLine />
      </div>
    );
  }
}

export default Chart;
