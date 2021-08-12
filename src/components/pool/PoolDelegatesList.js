import React, { useState } from 'react';
import "../../styles/components/Table.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
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
                var copied = false;
                return (
                    <tr>
                        <td style={tableRowStyle} scope="row">
                            <Row>
                                <Link to={`/stakingrewards/${item.stake_address}`}>
                                    <p style={{ fontSize: '1.0vw' }}>{item.stake_address}</p>
                                </Link>
                                <CopyToClipboard text={item.stake_address}>
                                    <FontAwesomeIcon icon={faClipboard} />
                                </CopyToClipboard>
                            </Row>
                            {/* {copied ? <span style={{color: 'red'}}>Copied.</span> : null} */}
                        </td>


                        <td style={tableRowStyleStake} scope="row"><p style={{ fontSize: '1.2vw' }}>{Number(item.stake_amount).toFixed(2)}</p></td>
                    </tr>
                )
            })
        )
    };
};

