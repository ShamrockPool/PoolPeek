import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png';
import PoolPmImage from 'assets/img/poolpm.png';
import AdaPoolImage from 'assets/img/adapools.png';
import CardanoImage from 'assets/img/cardanoIcon.png';
import "../../styles/components/Table.css";
import ReactHtmlParser from 'react-html-parser';
import Chart from '../Chart';
import SocialMedia from '../SocialMedia';
import { isEmpty } from 'utils/stringutil.js';
import ReactImageFallback from "react-image-fallback";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faGlobe, faShare, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import {
    FacebookShareButton,
    TelegramShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    VKShareButton,
    WhatsappShareButton,
    EmailShareButton,


    // Comment to sepaate, overwriting codesandbox behavior
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    LinkedinIcon,
    PinterestIcon,
    VKIcon,
    WhatsappIcon,
    EmailIcon
} from "react-share";
import { Telegram } from '@material-ui/icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // eslint-disable-line
import "react-tabs/style/react-tabs.css";

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
    paddingLeft: 5,
    paddingRight: 5
};

const cardBodyStyle = {
    //borderBottom: 'solid 3px green',
    // borderTop: 'solid 1px green',
    //borderRight: 'solid 3px green',
    //borderLeft: 'solid 3px green',
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

function convertImageUrlToHttps(url) {
    return url.replace("http:", "https:");
}

export default class PoolStats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            selectedTab: 0
        };

    }

    componentDidMount() {
    }

    setTab(index) {
        this.setState({
            selectedTab: index
        });
    }

    handleChange = (query) => (e) => {
    }

    render() {
        var item = this.props.pool;
        return (
            <div style={{ width: "100%", alignItems: "left" }}>
                <Card style={cardBodyStyle} body>
                    <Table {...{ ['striped']: true }}>
                        <tbody>
                            <tr>
                                <Tooltip
                                    title="Pool costs, margin is how much the pool take as extra rewards"
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Costs</th></Tooltip>
                                <td style={tableRowStyle}>
                                    <p>{item.margin_pct}% Margin,  {item.cost_per_epoch} ₳ Fixed Fee</p>
                                </td>
                            </tr>
                            {/* <tr>
                                <Tooltip
                                    title="Stake is the amount of ADA delegated to the pool."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Stake:</th></Tooltip>
                                <td style={tableRowStyle}>

                                    {item.live_stake != "0" && item.live_stake != "0.0" && (
                                        <p>Live Stake: {item.live_stake} ₳</p>
                                    )}
                                    {item.live_stake_delegators != "0" && item.live_stake_delegators != "0.0" && (
                                        <p>Live Delegators: {item.live_stake_delegator_count} </p>
                                    )}
                                    <p>Active Stake: {item.active_stake} ₳</p>
                                    <p>Active Delegators: {item.active_stake_delegator_count}</p>
                                    {(width > 600 && item.active_stake_history.length > 0) &&
                                        <Chart data={item.active_stake_history} currentEpoch={item.active_stake_epoch} currentActiveStake={item.active_stake} />
                                    }
                                </td>
                            </tr> */}
                            {item.live_stake != "0" && item.live_stake != "0.0" && <tr>
                                <Tooltip
                                    title="Stake is the amount of ADA delegated to the pool."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Live Stake</th></Tooltip>
                                <td style={tableRowStyle}>
                                    <p>{item.live_stake} ₳</p>
                                </td>
                            </tr>}
                            <tr>
                                <Tooltip
                                    title="Stake is the amount of ADA delegated to the pool."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Active Stake</th></Tooltip>
                                <td style={tableRowStyle}>
                                    <p>{item.active_stake} ₳</p>
                                    {(width > 600 && item.active_stake_history.length > 0) &&
                                        <Chart data={item.active_stake_history} currentEpoch={item.active_stake_epoch} currentActiveStake={item.active_stake} />
                                    }
                                </td>
                            </tr>
                            {item.live_stake_delegators != "0" && item.live_stake_delegators != "0.0" && <tr>
                                <Tooltip
                                    title="The amount of people staking to the pool."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Live Delegates</th></Tooltip>
                                <td style={tableRowStyle}>
                                    <p>{item.live_stake_delegator_count} </p>
                                </td>
                            </tr>}
                            <tr>
                                <Tooltip
                                    title="The amount of people staking to the pool."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Active Delegators</th></Tooltip>
                                <td style={tableRowStyle}>
                                    <p>{item.active_stake_delegator_count}</p>
                                </td>
                            </tr>
                            <tr>
                                <Tooltip
                                    title="Pledge is how much the pool operator has staked in the pool."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Pledge</th></Tooltip>
                                <td style={tableRowStyle}>
                                    <p>{item.pledge} ₳</p>
                                </td>
                            </tr>
                            <tr>
                                <Tooltip
                                    title="The current saturation of the pool."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Saturation</th></Tooltip>
                                <td style={tableRowStyle}><p>{Number(item.pct_saturated).toFixed(3)}%</p>
                                </td>
                            </tr>

                            <tr>
                                <Tooltip
                                    title="The number of blocks this pool has minted this Epoch so far."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Live Blocks</th></Tooltip>
                                <td style={tableRowStyle}><p>{item.blocks_this_epoch}</p></td>
                            </tr>
                            <tr>
                                <Tooltip
                                    title="The number of blocks this pool has minted."
                                    placement="left"
                                >
                                    <th style={tableRowStyle} scope="row">Total Blocks</th></Tooltip>
                                <td style={tableRowStyle}><p>{item.blocks}</p></td>
                            </tr>


                        </tbody>
                    </Table>
                </Card>
            </div >
        )
    };
};

