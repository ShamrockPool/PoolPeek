import React from 'react';
import _ from 'lodash';
import { getColor } from 'utils/colors';
import { Line } from 'react-chartjs-2';

const lineOptions = {
  scales: {
    xAxes: [{
      gridLines: {
        display: true,
      },
    }],
    yAxes: [{
      stacked: true,
      gridLines: {
        display: true,
      },
      ticks: {
        beginAtZero: true,
        // Return an empty string to draw the tick line but hide the tick label
        // Return `null` or `undefined` to hide the tick line entirely
        userCallback(value) {
          // Convert the number to a string and splite the string every 3 charaters from the end
          value = value.toString();
          value = value.split(/(?=(?:...)*$)/);

          // Convert the array to a string and format the output
          value = value.join('.');
          return `${value}%`;
        },
      },
    }],
  },
  legend: {
    display: true,
  },
  tooltips: {
    enabled: true,
  },
};


export default class LoadChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getChainLoad() {
    var chainLoad = this.props.chainLoadData;
    var chartData = [];

    var i;

    chartData.push(parseFloat(chainLoad.oneDay));
    chartData.push(parseFloat(chainLoad.twoDay));
    chartData.push(parseFloat(chainLoad.threeDay));
    chartData.push(parseFloat(chainLoad.fourDay));
    chartData.push(parseFloat(chainLoad.fiveDay));
    chartData.push(parseFloat(chainLoad.sixDay));
    chartData.push(parseFloat(chainLoad.sevenDay));

    return chartData;
  }


  getGraphLabels() {

    var labels = [];

    labels.push(1);
    labels.push(2);
    labels.push(3);
    labels.push(4);
    labels.push(5);
    labels.push(6);
    labels.push(7);
    return labels;
  }

  async componentDidMount() {
  }

  genLineData() {
    return {
      labels: this.getGraphLabels(),
      datasets: [
        {
          label: 'Chain Load Per Day',
          backgroundColor: getColor('secondary'),
          borderColor: getColor('secondary'),
          borderWidth: 1,
          data: this.getChainLoad(),
          fill: 'start',
        },
      ],
    };
  };

  render() {
    return (
      <div className="container-fluid" style={{ align: "left", width: "100%", height: "100%", display: 'inline-block' }}>
        <Line data={this.genLineData()} options={lineOptions} />
      </div >
    );
  }
}