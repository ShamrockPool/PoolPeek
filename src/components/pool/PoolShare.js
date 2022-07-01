import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import "../../styles/components/Table.css";
import { isEmpty } from 'utils/stringutil.js';
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


export default class PoolShare extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            selectedTab: 0
        };

    }
    render() {
        var item = this.props.pool;
        return (
            <div style={{ width: "100%", alignItems: "left" }}>
                <Card style={cardBodyStyle} body>
                    <Table {...{ ['striped']: true }}>
                        <tbody>
                            <tr>
                                <th style={tableRowStyle} scope="row">Share pool:</th>
                                <td style={tableRowStyle}>

                                    <FacebookShareButton url={"https://poolpeek.com/pool/" + item.pool_id}
                                        title={"Checkout " + item.name + " on poolpeek.com!"}>
                                        <FacebookIcon
                                            size={"2.5rem"}
                                            round
                                        />
                                    </FacebookShareButton>

                                    <TwitterShareButton url={"https://poolpeek.com/pool/" + item.pool_id}
                                        title={"Checkout " + item.name + " on poolpeek.com!"}>
                                        <TwitterIcon size={"2.5rem"} round />
                                    </TwitterShareButton>

                                    <TelegramShareButton url={"https://poolpeek.com/pool/" + item.pool_id}
                                        title={"Checkout " + item.name + " on poolpeek.com!"}>
                                        <TelegramIcon size={"2.5rem"} round />
                                    </TelegramShareButton>
                                </td>
                            </tr>
                            <tr>
                                <th style={tableRowStyle} scope="row">Promote Pool:</th>
                                <td style={tableRowStyle}>
                                    <p>COMING SOON!</p>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div >
        )
    };
};

