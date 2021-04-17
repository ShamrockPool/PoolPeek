import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png';
import PoolPmImage from 'assets/img/poolpm.png';
import AdaPoolImage from 'assets/img/adapools.png';
import ReactHtmlParser from 'react-html-parser';
import { isEmpty } from 'utils/stringutil.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import "react-tabs/style/react-tabs.css";
import "../../styles/components/Table.css";

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional

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

export default class PoolInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            selectedTab: 0
        };

    }

    componentDidMount() {
    }

    render() {
        var item = this.props.pool;
        return (

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
                                        onCopy={() => this.setState({ copied: true })}
                                    >
                                        <FontAwesomeIcon icon={faClipboard} />
                                    </CopyToClipboard>
                                </Tooltip>
                                {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}
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
        )
    };
};

