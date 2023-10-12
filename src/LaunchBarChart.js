import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class LaunchBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "launch-bar-chart",
        },
        xaxis: {
          categories: [],
        },
      },
      series: [
        {
          name: "Launch Count",
          data: [],
        },
      ],
    };
  }

  componentDidMount() {
    const { launchesData } = this.props;

    const launchesPerYear = {};
    launchesData.forEach((launch) => {
      const year = launch.launch_year;
      if (year in launchesPerYear) {
        launchesPerYear[year]++;
      } else {
        launchesPerYear[year] = 1;
      }
    });

    const years = Object.keys(launchesPerYear);
    const launchCounts = Object.values(launchesPerYear);

    this.setState({
      options: {
        ...this.state.options,
        xaxis: {
          categories: years,
        },
      },
      series: [
        {
          name: "Launch Count",
          data: launchCounts,
        },
      ],
    });
  }

  render() {
    // {console.log(this.state.options+this.state.series)}
    return (
      <div className={this.props.changeclass === 'Launch Bar Chart' ? "full-width" : "launch-bar-chart"} >
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={400}
        />
      </div>
    );
  }
}

export default LaunchBarChart;
