import React, { useState } from 'react';
import PoolInfo from 'components/pool/PoolInfo';
import PoolShare from 'components/pool/PoolShare';
import PoolStats from 'components/pool/PoolStats';
import PoolDelagates from 'components/pool/PoolDelagates';
import PoolBlocks from 'components/pool/PoolBlocks';

import { isEmpty } from 'utils/stringutil.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // eslint-disable-line
import "react-tabs/style/react-tabs.css";
import "../../styles/components/Table.css";
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactImageFallback from "react-image-fallback";
import SocialMedia from '../SocialMedia';
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faDatabase, faPeopleCarry, faShare, faCube } from '@fortawesome/free-solid-svg-icons';
var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;

const cardheaderStyle = {
    borderBottom: 'solid 3px green',
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

export default class Pool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            selectedTab: 1
        };

    }
    componentDidMount() {
        
    }
    setTab(index) {
        this.setState({
            selectedTab: index
        });
    }
    render() {

        return (
            <div>
                <CardHeader style={cardheaderStyle}>
                    <div style={{ display: 'inline-block' }}>
                        <h3>
                            {checkIsImageUrl(this.props.pool.extended_meta.url_png_logo) ? (
                                <ReactImageFallback
                                    src={this.props.pool.extended_meta.url_png_logo}
                                    width="40"
                                    height="40"
                                    fallbackImage={CardanoImage} />
                            ) : (<img
                                src={CardanoImage}
                                className="pr-2"
                                width="38"
                                height="32"
                            />)}
                            <b>&nbsp;{ReactHtmlParser(this.props.pool.name)}</b>
                            <SocialMedia extendedmeta={this.props.pool.extended_meta} item={this.props.pool} />
                        </h3>
                    </div>

                    {/* <p style={{ paddingLeft: '40px' }}><b>{this.props.pool.live_stake} ₳</b></p> */}

                    <p>{ReactHtmlParser(linkifyHtml(this.props.pool.description, {
                        defaultProtocol: 'https'
                    }))}</p>

                    <Tabs
                        selectedIndex={this.state.selectedTab}
                        onSelect={(selectedTab) => this.setState({ selectedTab: selectedTab })}

                    >
                        <TabList>
                            <Tab><FontAwesomeIcon icon={faInfo} /> Info</Tab>
                            <Tab><FontAwesomeIcon icon={faDatabase} /> Stats</Tab>
                            <Tab><FontAwesomeIcon icon={faCube} /> Blocks</Tab>
                            <Tab><FontAwesomeIcon icon={faPeopleCarry} /> Delegates</Tab>
                            <Tab><FontAwesomeIcon icon={faShare} /> Promote</Tab>
                        </TabList>

                        <TabPanel>
                            {this.props.pool && <PoolInfo pool={this.props.pool} />}
                        </TabPanel>
                        <TabPanel>
                            {this.props.pool && <PoolStats pool={this.props.pool} />}
                        </TabPanel>
                        <TabPanel>
                            {this.props.pool && <PoolBlocks pool={this.props.pool} />}
                        </TabPanel>
                        <TabPanel>
                            {this.props.pool && <PoolDelagates pool={this.props.pool} />}
                        </TabPanel>
                        <TabPanel>
                            {this.props.pool && <PoolShare pool={this.props.pool} />}
                        </TabPanel>
                    </Tabs>
                </CardHeader>
                <br></br>
            </div>
        )
    };
};

