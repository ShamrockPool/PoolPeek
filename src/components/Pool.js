import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png';
import PoolPmImage from 'assets/img/poolpm.png';
import AdaPoolImage from 'assets/img/adapools.png';
import CardanoImage from 'assets/img/cardanoIcon.png';
import "../styles/components/Table.css";
import ReactHtmlParser from 'react-html-parser';
import Chart from '../components/Chart';
import SocialMedia from './SocialMedia';
import { isEmpty } from 'utils/stringutil.js';
import ReactImageFallback from "react-image-fallback";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import ScaleText from "react-scale-text";

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
    if (url.startsWith("http")) {
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
        }
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
                                            src={convertImageUrlToHttps(item.extended_meta.url_png_logo)}
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
                                    <SocialMedia extendedmeta={item.extended_meta} />
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
                                                <th style={tableRowStyle} scope="row">Pool ID</th>
                                            </Tooltip>
                                            <td style={tableRowStyle} scope="row">
                                                {width > 600 && (<small>{item.pool_id}    </small>)}
                                                <Tooltip
                                                    title="Copy pool direct link"
                                                    placement="left"
                                                >
                                                    <CopyToClipboard text={"https://poolpeek.com/pool/" + item.pool_id}>
                                                        <FontAwesomeIcon icon={faClipboard} />
                                                    </CopyToClipboard>
                                                </Tooltip>
                                            </td>
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
                                        <tr>
                                            <Tooltip
                                                title="The website of the pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Website</th></Tooltip>
                                            <td style={tableRowStyle}><a href={item.homepage} target="_blank" rel="noreferrer"><p>{item.homepage}</p></a></td>
                                        </tr>
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
                                        <tr>
                                            <Tooltip
                                                title="The number of blocks this pool has minted."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Total Blocks</th></Tooltip>
                                            <td style={tableRowStyle}><p>{item.blocks}</p></td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="Pool margin is how much the pool take as extra rewards"
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Pool margin</th></Tooltip>
                                            <td style={tableRowStyle}><p>{item.margin_pct}%</p>
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
                                                title="How much a pool deducts from rewards."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Costs</th></Tooltip>
                                            <td style={tableRowStyle}>
                                                <p>{item.cost_per_epoch} ₳</p>
                                            </td>
                                        </tr>

                                        <tr>
                                            <Tooltip
                                                title="How many people are delegating to this pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Delegates</th></Tooltip>
                                            <td style={tableRowStyle}>
                                                <p>{item.active_stake_delegator_count}</p>
                                            </td>
                                        </tr>

                                        <tr><Tooltip
                                            title="Stake is the amount of ADA delegated to the pool."
                                            placement="left"
                                        >
                                            <th style={tableRowStyle} scope="row">Stake</th></Tooltip>
                                            <td style={tableRowStyle}>
                                                {/* <p>Active Stake: {item.active_stake} ₳</p>
                                            <p>Delegators: {item.active_stake_delegator_count}</p> */}
                                                {item.live_stake.length > 0 && item.live_stake != "0" && item.live_stake != "0.0" && (
                                                    <p>Live Stake: {item.live_stake} ₳</p>
                                                )}
                                                {/* <p>Active Stake: {item.active_stake} ₳</p> */}
                                                {/* <p>Delegators: {item.active_stake_delegator_count}</p> */}
                                                {width > 600 ?
                                                    <Chart data={item.active_stake_history} currentEpoch={item.active_stake_epoch} currentActiveStake={item.active_stake} />
                                                    :
                                                    <p>Active Stake: {item.active_stake} ₳</p>}
                                            </td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="The current saturation of the pool."
                                                placement="left"
                                            >
                                                <th style={tableRowStyle} scope="row">Pool Saturation</th></Tooltip>
                                            <td style={tableRowStyle}><p>{Number(item.pct_saturated).toFixed(3)}%</p>
                                            </td>
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

