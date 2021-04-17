import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png';
import PoolPmImage from 'assets/img/poolpm.png';
import AdaPoolImage from 'assets/img/adapools.png';
import CardanoImage from 'assets/img/cardanoIcon.png';
import "../styles/components/Table.css";
import ReactHtmlParser from 'react-html-parser';
import Chart from './Chart';
import SocialMedia from './SocialMedia';
import { isEmpty } from 'utils/stringutil.js';
import ReactImageFallback from "react-image-fallback";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;

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

function checkIsImageUrl(url) {
    if (isEmpty(url)) {
        return false;
    }
    if (url.startsWith("https") && (url.endsWith(".png") || url.endsWith(".jpeg"))) {
        return true;
    }
    return false;
}


export default class StakingRewardsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }
    render() {
        return (
            /*

delegated_pool: "TRAIN"
epoch: "218"
paidDate: "2020-09-27"
reward: "424.1558300000000000"
rewardDate: "2020-09-22"
            */
            this.props.stakingRewardsList.map(function (item, key) {
                return (
                    <tbody>
                        <tr>
                        <td style={tableRowStyle} scope="row"><p>{item.epoch}</p></td>
                        <td style={tableRowStyle} scope="row"><p>{item.delegated_pool}</p></td>
                        <td style={tableRowStyle} scope="row"><p>{item.reward}</p></td>
                        {/* <td style={tableRowStyle} scope="row"><p>{item.rewardDate}</p></td> */}
                        <td style={tableRowStyle} scope="row"><p>{item.paidDate}</p></td>
                        </tr>
                    </tbody>
                )
            }
            )
        )
    };
};

