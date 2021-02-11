import React from 'react';
import _ from 'lodash';

import { getColor } from 'utils/colors';
import { randomNum } from 'utils/demos';

import { Col, Card, CardHeader, CardBody } from 'reactstrap';

import { Line } from 'react-chartjs-2';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getActiveStakeHistory(active_stake_history) {
        var chartData = [];
        if (active_stake_history != 0 && active_stake_history != null && active_stake_history != undefined && active_stake_history.length > 0) {

            var i;
            for (i = 0; i < active_stake_history.length; i++) {
                chartData.push(active_stake_history[i].active_stake);
            }
        }
        return chartData;
    }


    getGraphLabels(active_stake_history) {
        var labels = [];
        var i;
        for (i = 0; i < active_stake_history.length; i++) {
            labels.push(active_stake_history[i].active_stake_epoch);
        }
        return labels;
    }

    async componentDidMount() {
    }

    genLineData() {
        return {
            labels: this.getGraphLabels(this.props.data),
            datasets: [
                {
                    label: 'Active Stake',
                    backgroundColor: getColor('primary'),
                    borderColor: getColor('primary'),
                    borderWidth: 1,
                    data: this.getActiveStakeHistory(this.props.data)
                },
            ],
        };
    };

    render() {
        return (
            <div className="container-fluid" style={{ align: "left", width: "99%" }}>
                <Col xl={6} lg={12} md={12}>
                    <Card>
                        <CardHeader>Line</CardHeader>
                        <CardBody>
                            <Line data={this.genLineData()} />
                        </CardBody>
                    </Card>
                </Col>
            </div >
        );
    }
}