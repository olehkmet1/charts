import React, { Component } from 'react';
import Chart from './Chart';
import data from '../../data/chart_data.json';


class Charts extends Component {

  state = {
    charts: null
  }

  _loadData = () => {
    const chartData = JSON.parse(JSON.stringify(data))
    console.log(chartData)
    this.setState({
      charts: chartData
    })
  }
  componentDidMount() {
    this._loadData()
  }

  render() {
    return (
      <div>
        <h1>Followers</h1>
        {
          this.state.charts ?
            this.state.charts.map((item, id) => (
              <Chart key={id} chart={item} />
            )) : null
        }
      </div>
    );
  }
}

export default Charts;