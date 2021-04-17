import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { isEmpty } from 'utils/stringutil.js';
import PoolDelegatesList from 'components/pool/PoolDelegatesList';
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

const tableRowStyle = {
    // borderBottom: 'solid 3px blue',
    // background: 'green',
    // color: 'white',
    fontWeight: 'bold',
    padding: 0,
    paddingLeft: 5,
    paddingRight: 5,
    width: '50%'
};

export default class PoolDelagates extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delegatesList: null,
            loading: true,
        };

    }

    componentDidMount() {
        this.getDelegates();
    }

    async getDelegates() {
        // if (!isEmpty(this.state.stakingAddress)) {
        const response = await fetch('https://smashpeek.com/services/pool/delegates/' + this.props.pool.pool_id);
        const data = await response.json();
        this.setState({ delegatesList: data });
        this.setState({ loading: false });
        return data;
        // }
    }

    render() {

        return (

            <div style={{ width: "100%", alignItems: "left" }}>
                <Table {...{ ['striped']: true }}>
                    <thead>
                        <tr>
                            <th style={tableRowStyle} >Stake Address</th>
                            <th style={tableRowStyle}>Wallet Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.loading ? <div>Loading delegates...<CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
                        :
                        <PoolDelegatesList delegatesList={this.state.delegatesList} />
                    }
                    </tbody>
                </Table>
            </div >
        )
    };
};

