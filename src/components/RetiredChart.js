import React from 'react';
import _ from 'lodash';
import { getColor } from 'utils/colors';
import { Line } from 'react-chartjs-2';

const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
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
          return `${value}`;
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


export default class RetiredChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }





  getRetiredChart() {

    var retiringList = this.props.retiringData;
    var chartData = [];

    var i;
    for (i = 0; i < retiringList.length; i++) {

      var number = parseFloat(retiringList[i].total_pools);
      chartData.push(number);
    }

    chartData = chartData.reverse();
    return chartData;
  }


  getGraphLabels() {

    var retiringList = this.props.retiringData;
    var labels = [];

    var i;
    for (i = 0; i < retiringList.length; i++) {

      var number = parseFloat(retiringList[i].retiring_epoch);
      labels.push(number);
    }

    labels = labels.reverse();
    return labels;
  }

  async componentDidMount() {
  }

  genLineData() {
    return {
      labels: this.getGraphLabels(),
      datasets: [
        {
          label: 'Pool Retire Count Per Epoch',
          backgroundColor: getColor('secondary'),
          borderColor: getColor('secondary'),
          borderWidth: 1,
          data: this.getRetiredChart(),
          fill: 'false',
        }
      ],

      annotation: {
        annotations: [
          {
            type: "line",
            mode: "horizontal",
            scaleID: "x-axis-0",
            borderColor: "red",
            label: {
              content: "",
              enabled: true,
              position: "top"
            }
          }
        ]
      }

    };
  };

  render() {
    return (
      <div>
        <Line data={this.genLineData()} options={lineOptions}  width={800} height={300} style={{ align: "center" }} />
      </div >
    );
  }
}