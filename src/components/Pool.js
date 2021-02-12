import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';
import CardanoImage from 'assets/img/cardanoIcon.png';
import "../styles/components/Table.css";
import ReactHtmlParser from 'react-html-parser';

import Chart from '../components/Chart';

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');



export default class Pool extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.pools.map(function (item, key) {

                var description = linkifyHtml(item.description, {
                    defaultProtocol: 'https'
                });

                return (
                    <div key={key} style={{ alignItems: "left" }}>
                        <Card>
                            <CardHeader >
                                <img
                                    src={CardanoImage}
                                    className="pr-2"
                                    alt=""
                                    width="28"
                                    height="25"
                                />{ReactHtmlParser(item.name)}<p><small>{item.pool_id}</small></p></CardHeader>
                            <Card body>
                                <p>{ReactHtmlParser(description)}</p>
                                <Table {...{ ['striped']: true }}>
                                    <tbody>
                                        <tr>
                                            <Tooltip
                                                title="The pool ticker"
                                                placement="left"
                                            >
                                                <th scope="row" style={{ width: '20%' }}>Ticker</th>
                                            </Tooltip>
                                            <td scope="row"><p>{ReactHtmlParser(item.ticker)}</p></td>
                                        </tr>
                                        {item.retirement_epoch.length > 0 && (
                                            <tr>
                                                <Tooltip
                                                    title="Retirement Epoch"
                                                    placement="left"
                                                >
                                                    <th scope="row" style={{ width: '20%' }}>Retirement Epoch</th>
                                                </Tooltip>
                                                <td scope="row"><p>{ReactHtmlParser(item.retirement_epoch)}</p></td>
                                            </tr>
                                        )}
                                        <tr>
                                            <Tooltip
                                                title="The website of the pool."
                                                placement="left"
                                            >
                                                <th scope="row" style={{ width: '20%' }}>Website</th></Tooltip>
                                            <td><a href={item.homepage} target="_blank" rel="noreferrer"><p>{item.homepage}</p></a></td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="The number of blocks this pool has minted."
                                                placement="left"
                                            >
                                                <th scope="row" style={{ width: '20%' }}>Produced Blocks</th></Tooltip>
                                            <td><p>{item.blocks}</p></td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="Important pool information"
                                                placement="left"
                                            >
                                                <th scope="row" style={{ width: '20%' }}>Pool Info</th></Tooltip>
                                            <td><p>Pool margin: {item.margin_pct}%</p>    <p>Pledge: {item.pledge} ₳</p>     <p>Cost per epoch: {item.cost_per_epoch} ₳</p>
                                                <p>Delegators: {item.active_stake_delegator_count}</p></td>
                                        </tr>
                                        <tr><Tooltip
                                            title="Stake is the amount of ADA delegated to the pool."
                                            placement="left"
                                        >
                                            <th scope="row" style={{ width: '20%' }}>Stake</th></Tooltip>
                                            <td>
                                                {/* <p>Active Stake: {item.active_stake} ₳</p>
                                            <p>Delegators: {item.active_stake_delegator_count}</p> */}
                                                <Chart data={item.active_stake_history} currentEpoch={item.active_stake_epoch} currentActiveStake={item.active_stake} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="The current saturation of the pool."
                                                placement="left"
                                            >
                                                <th scope="row" style={{ width: '20%' }}>Pool Saturation</th></Tooltip>
                                            <td><p>{Number(item.pct_saturated).toFixed(3)}%</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="The meta data urls of the pool."
                                                placement="left"
                                            >
                                                <th scope="row" style={{ width: '20%' }}>Pool Meta Data Urls</th></Tooltip>
                                            <td><a href={item.metadata_url} target="_blank" rel="noreferrer"><p>{item.meta_url_display}</p></a>
                                                {item.metadata_extended_url.length > 0 && (
                                                    <a href={item.metadata_extended_url} target="_blank" rel="noreferrer"><p>{item.meta_ext_url_display}</p></a>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <Tooltip
                                                title="Sites containing more information on the pool."
                                                placement="left"
                                            >
                                                <th scope="row" style={{ width: '20%' }}>External Sites</th></Tooltip>
                                            <td><a href={"https://pool.pm/" + item.pool_id} target="_blank" rel="noreferrer">                                                                <img
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

