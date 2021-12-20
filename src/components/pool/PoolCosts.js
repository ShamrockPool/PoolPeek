import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { isEmpty } from 'utils/stringutil.js';

import PoolCostsList from './PoolCostsList';

import { css } from "@emotion/core";

import "react-tabs/style/react-tabs.css";
import "../../styles/components/Table.css";

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default class PoolCosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delegatesList: null,
            loading: true,
        };

    }

    render() {

        return (

            <div style={{ width: "100%", alignItems: "left" }}>
                <Table {...{ ['striped']: true }}>
                    <thead>
                        {width > 700 && <tr>
                            <th>Active Epoch</th>
                            <th>Margin</th>
                            <th>Fixed Cost</th>

                        </tr>}
                    </thead>
                    {this.props.pool.costs_history != null &&
                        <PoolCostsList costs_history={this.props.pool.costs_history} />}
                </Table>
            </div >
        )
    };
};

