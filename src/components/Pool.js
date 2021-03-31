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

function convertImageUrlToHttps(url) {
    return url.replace("http:", "https:");
}

export default class Pool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    componentDidMount() {
    }

    render() {
        return (

            this.props.pools.map(function (item, key) {

                var description = linkifyHtml(item.description, {
                    defaultProtocol: 'https'
                });
                return (
                    <div key={key} style={{ width: "100%", alignItems: "left" }}>
                        <Card>
                            <CardHeader style={cardheaderStyle}>
                                <div style={{ display: 'inline-block' }}>
                                    {checkIsImageUrl(item.extended_meta.url_png_logo) ? (
                                        <ReactImageFallback
                                            src={item.extended_meta.url_png_logo}
                                            width="32"
                                            height="32"
                                            fallbackImage={CardanoImage} />
                                    ) : (<img
                                        src={CardanoImage}
                                        className="pr-2"
                                        width="34"
                                        height="28"
                                    />)}
                                    <b>&nbsp;{ReactHtmlParser(item.name)}</b>
                                    <SocialMedia extendedmeta={item.extended_meta} item={item}/>&nbsp;


                                </div>
                                <p>{ReactHtmlParser(description)}</p>
                            </CardHeader>
                            <Card style={cardBodyStyle} body>

                                <Table {...{ ['striped']: true }}>
                                    <tbody>
                                        <tr>
                                            <Tooltip
                                                title="The pool ticker"
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Ticker</th>
                                            </Tooltip>
                                            <td style={tableRowStyle} scope="row"><p>{ReactHtmlParser(item.ticker)}</p></td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="The pool id"
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">ID</th>
                                            </Tooltip>
                                            <td style={tableRowStyle} scope="row">
                                                {width > 600 && (<small>{item.pool_id}    </small>)}
                                                <Tooltip
                                                    title="Copy Pool ID"
                                                    placement="left"
                                                >
                                                    <CopyToClipboard text={item.pool_id}
                                                    >
                                                        <FontAwesomeIcon icon={faClipboard} />
                                                    </CopyToClipboard>
                                                </Tooltip>

                                            </td>
                                            {/* {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null} */}
                                        </tr>
                                        {item.retirement_epoch.length > 0 && (
                                            <tr>
                                                <Tooltip
                                                    title="Retirement Epoch"
                                                    placement="left"
                                                >
                                                    <th style={tableRowStyle} scope="row">Retirement Epoch</th>
                                                </Tooltip>
                                                <td style={tableRowStyle} scope="row"><p>{ReactHtmlParser(item.retirement_epoch)}</p></td>
                                            </tr>
                                        )}
                                        {/* <tr>
                                            <Tooltip
                                                title="The website of the pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Website</th></Tooltip>
                                            <td style={tableRowStyle}><a href={item.homepage} target="_blank" rel="noreferrer"><p>{item.homepage}</p></a></td>
                                        </tr> */}
                                        {!isEmpty(item.extended_meta.location) && (<tr>
                                            <Tooltip
                                                title="The location of the pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Location</th></Tooltip>
                                            <td style={tableRowStyle}>
                                                <p>{item.extended_meta.location}</p>
                                            </td>
                                        </tr>)}

                                        {/* <tr>
                                            <Tooltip
                                                title="Pool margin is how much the pool take as extra rewards"
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Margin</th></Tooltip>
                                            <td style={tableRowStyle}><p>{item.margin_pct}%</p>
                                            </td>
                                        </tr> */}

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
                                        <tr>
                                            <Tooltip
                                                title="Stake is the amount of ADA delegated to the pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Stake:</th></Tooltip>
                                            <td style={tableRowStyle}>

                                                {item.live_stake > 0 && item.live_stake != "0" && item.live_stake != "0.0" && (
                                                    <p>Live Stake: {item.live_stake} ₳</p>
                                                )}
                                                {item.live_stake_delegators > 0 && item.live_stake_delegators != "0" && item.live_stake_delegators != "0.0" && (
                                                    <p>Live Delegators: {item.live_stake_delegators} ₳</p>
                                                )}
                                                <p>Active Stake: {item.active_stake} ₳</p>
                                                <p>Active Delegators: {item.active_stake_delegator_count}</p>
                                                {(width > 600 && item.active_stake_history.length > 0) &&
                                                    <Chart data={item.active_stake_history} currentEpoch={item.active_stake_epoch} currentActiveStake={item.active_stake} />
                                                }
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
                                                title="The number of blocks this pool has minted."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Total Blocks</th></Tooltip>
                                            <td style={tableRowStyle}><p>{item.blocks}</p></td>
                                        </tr>

                                        {/* <tr>
                                            <Tooltip
                                                title="The meta data urls of the pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Pool Meta Data Urls</th></Tooltip>
                                            <td style={tableRowStyle}><a href={item.metadata_url} target="_blank" rel="noreferrer"><p>{item.meta_url_display}</p></a>
                                                {item.metadata_extended_url.length > 0 && (
                                                    <a href={item.metadata_extended_url} target="_blank" rel="noreferrer"><p>{item.meta_ext_url_display}</p></a>
                                                )}
                                            </td>
                                        </tr> */}
                                        <tr>
                                            <th style={tableRowStyle} scope="row">Share pool:</th>
                                            <td style={tableRowStyle}>

                                                <FacebookShareButton url={"https://poolpeek.com/pool/" + item.pool_id}
                                                    title={"Checkout " + item.name + " on poolpeek.com!"}>
                                                    <FacebookIcon
                                                        size={"1.5rem"} // You can use rem value instead of numbers
                                                        round
                                                    />
                                                </FacebookShareButton>

                                                <TwitterShareButton url={"https://poolpeek.com/pool/" + item.pool_id}
                                                    title={"Checkout " + item.name + " on poolpeek.com!"}>
                                                    <TwitterIcon size={"1.5rem"} round />
                                                </TwitterShareButton>

                                                <TelegramShareButton url={"https://poolpeek.com/pool/" + item.pool_id}
                                                    title={"Checkout " + item.name + " on poolpeek.com!"}>
                                                    <TelegramIcon size={"1.5rem"} round />
                                                </TelegramShareButton>
                                            </td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="Sites containing more information on the pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">External Sites</th></Tooltip>
                                            <td style={tableRowStyle}><a href={"https://pool.pm/" + item.pool_id} target="_blank" rel="noreferrer">                                                                <img
                                                src={PoolPmImage}
                                                className="pr-2"
                                                alt=""
                                            /></a>
                                                <a href={"https://adapools.org/pool/" + item.pool_id} target="_blank" rel="noreferrer">                                                                <img
                                                    src={AdaPoolImage}
                                                    className="pr-2"
                                                    alt=""
                                                /></a>
                                                <a href={"https://pooltool.io/pool/" + item.pool_id} target="_blank" rel="noreferrer">                                                                <img
                                                    src={PooltoolImage}
                                                    className="pr-2"
                                                    alt=""
                                                /></a></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card>
                        </Card>
                        <br></br>


                    </div >
                )
            })
        )
    };
};

