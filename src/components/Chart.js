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
            return `₳ ${value}`;
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


export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getActiveStakeHistory() {
        var active_stake_history = this.props.data;
        var chartData = [];
        if (active_stake_history != 0 && active_stake_history != null && active_stake_history != undefined && active_stake_history.length > 0) {

            var i;
            for (i = 0; i < active_stake_history.length; i++) {

                var activeStakeNumber = parseFloat(active_stake_history[i].active_stake.replace(/,/g, ''));
                chartData.push(activeStakeNumber);
            }
        }
        chartData = chartData.reverse();
       // chartData.push(parseFloat(this.props.currentActiveStake.replace(/,/g, '')));
        return chartData;
    }


    getGraphLabels() {
        var active_stake_history = this.props.data;
        var labels = [];
        var i;
        for (i = 0; i < active_stake_history.length; i++) {
            labels.push(active_stake_history[i].active_stake_epoch);
        }
        labels = labels.reverse();
        labels.push(this.props.currentEpoch);
        return labels;
    }

    async componentDidMount() {
    }

    genLineData() {
        return {
            labels: this.getGraphLabels(),
            datasets: [
                {
                    label: 'Active Stake',
                    backgroundColor: getColor('secondary'),
                    borderColor: getColor('secondary'),
                    borderWidth: 1,
                    data: this.getActiveStakeHistory(),
                    fill: 'start',
                },
            ],
        };
    };

    render() {
        return (
            <div className="container-fluid" style={{ align: "left", width: "100%", height: "100%", display: 'inline-block'}}>
                    <Line data={this.genLineData()}  options={lineOptions}/>
            </div >
        );
    }
}