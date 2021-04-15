import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import "../../styles/components/Table.css";




var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional


const tableRowStyle = {
    // borderBottom: 'solid 3px blue',
    // background: 'green',
    // color: 'white',
    fontWeight: 'bold',
    padding: 0,
};

const cardheaderStyle = {
    // borderBottom:  'solid 1px',
    borderTop: 'solid 3px green',
    borderRight: 'solid 3px green',
    borderLeft: 'solid 3px green',
    // background: 'green',
    // color: 'white',
    paddingBottom: 0
};

const cardBodyStyle = {
    borderBottom: 'solid 3px green',
    // borderTop: 'solid 1px green',
    borderRight: 'solid 3px green',
    borderLeft: 'solid 3px green',
    // background: 'green',
    // color: 'white',
    paddingBottom: 0,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10
};



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
                    <tbody>
                        <tr>
                            <td style={tableRowStyle} scope="row">
                            <a href={"https://poolpeek.com/stakingrewards/"+item.stakeAddress} target="_blank" rel="noreferrer">
                                {item.stakeAddress}</a></td>
                                <td style={tableRowStyle} scope="row"><p>{Number(item.stakeAmount).toFixed(2)}</p></td>
                        </tr>
                    </tbody>
                )
            })
        )
    };
};

