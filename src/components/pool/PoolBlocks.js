import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { isEmpty } from 'utils/stringutil.js';
import PoolBlocksList from 'components/pool/PoolBlocksList';
import CircleLoader from "react-spinners/CircleLoader";
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

export default class PoolBlocks extends React.Component {

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
                        <tr>
                            <th>Epoch</th>
                            <th>Active Stake</th>
                            <th>Expected Blocks</th>
                            <th>Blocks Minted</th>
                            <th>Luck</th>
                        </tr>
                    </thead>
                    {this.props.pool.block_history != null &&
                    <PoolBlocksList block_history={this.props.pool.block_history} currentEpoch={this.props.pool.active_stake_epoch} />}
                </Table>
            </div >
        )
    };
};

