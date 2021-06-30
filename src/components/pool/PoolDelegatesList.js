import React, { useState } from 'react';
import "../../styles/components/Table.css";
import { Input, Pagination, PaginationItem, PaginationLink, Table, Button, Card, CardBody, CardHeader, Col, Row, CardText } from 'reactstrap';
var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional


const tableRowStyle = {
    // borderBottom: 'solid 3px blue',
    // background: 'green',
    // color: 'white',
    fontWeight: 'normal',
    padding: 0,
    width: '75%',
    maxWidth: 75,
};

const tableRowStyleStake = {
    // borderBottom: 'solid 3px blue',
    // background: 'green',
    // color: 'white',
    fontWeight: 'normal',
    padding: 0,
    width: '25%',
    maxWidth: 25,
};

const width = window.innerWidth;

export default class PoolDelegatesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    /*

delegated_pool: "TRAIN"
epoch: "218"
paidDate: "2020-09-27"
reward: "424.1558300000000000"
rewardDate: "2020-09-22"
*/
    render() {
        return (
            this.props.delegatesList.map(function (item, key) {
                return (                    
                    <tr>
                        <td style={tableRowStyle} scope="row">
                            <a href={"https://poolpeek.com/stakingrewards/" + item.stakeAddress} target="_blank" rel="noreferrer">
                            <p style={{fontSize: '1.2vw'}}>{item.stakeAddress}</p></a></td>
                        <td style={tableRowStyleStake} scope="row"><p style={{fontSize: '1.3vw'}}>{Number(item.stakeAmount).toFixed(2)}</p></td>
                    </tr>
                )
            })
        )
    };
};

