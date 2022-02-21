import React, { useState } from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Page from 'components/Page';
import ShareProject from '../../components/ShareProject';
import PoolDelagates from 'components/pool/PoolDelagates';
import PoolBadges from 'components/pool/PoolBadges';
import PoolBlocks from 'components/pool/PoolBlocks';
import PoolCosts from './PoolCosts';
import { css } from "@emotion/core";
import { isEmpty } from 'utils/stringutil.js';
import "react-tabs/style/react-tabs.css";
import "../../styles/components/Table.css";
import {
    Card, CardBody, CardHeader, Col, Row, Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // eslint-disable-line
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactImageFallback from "react-image-fallback";
import SocialMedia from '../SocialMedia';
import ReactHtmlParser from 'react-html-parser';
import { faInfo, faPeopleCarry, faHistory, faCube, faAward, faClipboard, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from "@material-ui/icons/Favorite";
import IconButton from '@material-ui/core/IconButton';
import { baseUrlPoolPeekService, getPoolDelegates, getPoolDelegatesHistory, requestPoolAdvertising } from 'assets/services';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import Chart from '../Chart';
import JoinPool from 'components/nami/JoinPool';
var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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

const cardano = window.cardano;

export default class PoolDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            selectedTab: 0,
            loading: true,
            delegatesList: null,
            delegateHistory: [],
            twitterUrl: null,
            favourite: false,
            stakeFeed: null,
            namiEnabled: false,
            modal: false,
            modal_backdrop: false,
            modal_nested_parent: false,
            modal_nested: false,
            requestpromotion_status: null,
            requestpromotion_response: null,
            requestpromotion_start: null,
            requestpromotion_end: null
        };

    }

    toggle() {
        return this.setState({
            modal: !this.state.modal,
        });
    };

    async componentDidMount() {
        this.getTwitterName();
        this.getDelegates();
        //this.loopingDelegateHistory();
        // this.getStakeFeed();
        this.isPoolFavourite(ReactHtmlParser(this.props.pool.name));

        try {
            var namiEnabled = await cardano.nami.isEnabled()
            this.setState({ namiEnabled: namiEnabled });
        } catch (error) {

        }
    }

    async getDelegates() {
        const response = await fetch(baseUrlPoolPeekService + getPoolDelegates + this.props.pool.pool_id);
        const data = await response.json();
        this.setState({ delegatesList: data });
    }

    async loopingDelegateHistory() {
        while (true) {
            await this.getDelegatesHistory();
            await this.sleep(30000);
            console.log('fetching stake feed');
        }
    }

    async getDelegatesHistory() {
        const response = await fetch(baseUrlPoolPeekService + getPoolDelegatesHistory + this.props.pool.pool_id);
        const data = await response.json();
        this.setState({ delegateHistory: data });
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    getTwitterName() {
        var handle = this.props.pool.extended_meta.twitter_handle;
        if (handle != null && !isEmpty(handle)) {
            var name = handle.replace('https://twitter.com/', '');
            name = name.replace('@', '');
            var url = "https://twitter.com/" + name + "?ref_src=twsrc%5Etfw";
            this.setState({ twitterUrl: name });
        }
    }

    calculateLuck() {
        try {

            return this.props.pool.block_history[1].luck;

        } catch (error) {
            return null;
        }
    }

    calculateTotalLuck() {
        try {
            var totalLuck = 0;
            for (let i = 1; i < this.props.pool.active_stake_history.length; i++) {

                var active_stake_history = this.props.pool.active_stake_history[i];
                var lastEpochStakeString = active_stake_history.active_stake.replaceAll(",", "");
                var lastEpochStake = Number(lastEpochStakeString);
                var divider = lastEpochStake / 1062037;

                var block_history = null;
                var blockEpoch = 0;
                var blocksLuck = 0;
                try {
                    block_history = this.props.pool.block_history[i];
                    blockEpoch = block_history.blocks;
                    blocksLuck = blockEpoch / divider;
                } catch (error) {

                }

                if (blocksLuck != null && blocksLuck != 0) {
                    totalLuck += Math.round(blocksLuck * 100, 0);
                }
            }
            var totalLuckPercent = totalLuck / this.props.pool.active_stake_history.length;
            return totalLuckPercent.toFixed(2);
        } catch (error) {
            console.log(error);
            return 0;
        }
    }

    calculateTotalBlocks() {
        var total = 0;
        this.props.pool.block_history.forEach(element => {
            total += parseInt(element.blocks);
        });
        return total;
    }

    async requestPoolPromotion(poolId) {
        console.log(poolId);
        this.toggle();
        const response = await fetch(baseUrlPoolPeekService + requestPoolAdvertising + this.props.pool.pool_id);
        const data = await response.json();

        if (data != null) {

            try {
                if (data.start_date_time && data.end_date_time) {
                    var startDateTime = null;
                    startDateTime = data.start_date_time.replace("T", " ");
                    startDateTime = startDateTime.substring(0, 16)

                    var endDateTime = null;
                    endDateTime = data.end_date_time.replace("T", " ");
                    endDateTime = endDateTime.substring(0, 16);
                    this.setState({ requestpromotion_start: startDateTime, requestpromotion_end: endDateTime });
                }
            } catch (error) {

            }


        }
        this.setState({ requestpromotion_status: response.status, requestpromotion_response: data });



    }

    handleFavourite(isFav) {
        this.setState({ favourite: isFav });

        var poolName = ReactHtmlParser(this.props.pool.name);
        var poolId = this.props.pool.pool_id;
        var url_png_logo = this.props.pool.extended_meta.url_png_logo;
        var description = ReactHtmlParser(linkifyHtml(this.props.pool.description, {
            defaultProtocol: 'https'
        }));

        var poolNameString = poolName[0];
        var storage = localStorage.getItem('favouritepools');
        if (storage != null) {
            var obj = JSON.parse(storage);

            //add to favourites
            if (isFav) {
                var isAfavouritePool = false;
                obj.favouritepools.forEach((item) => {
                    if (item.name == poolNameString) {
                        isAfavouritePool = true;
                    }
                });

                if (!isAfavouritePool) {
                    obj['favouritepools'].push({ "name": poolNameString, "pool_id": poolId, "url_png_logo": url_png_logo, "description": description });
                    var jsonStr = JSON.stringify(obj);
                    localStorage.setItem('favouritepools', jsonStr);
                }
            } else {//remove from favourites
                var newFavsJson = '{"favouritepools":[]}';
                var newFavsJsonObj = JSON.parse(newFavsJson);
                var existingFavs = JSON.parse(storage);
                existingFavs.favouritepools.forEach((item) => {
                    if (item.name != poolNameString) {
                        newFavsJsonObj['favouritepools'].push({ "name": item.name, "pool_id": item.pool_id, "url_png_logo": item.url_png_logo, "description": item.description });
                    }
                });
                localStorage.setItem('favouritepools', JSON.stringify(newFavsJsonObj));

            }


        } else {
            var jsonStr = '{"favouritepools":[]}';
            var obj = JSON.parse(jsonStr);
            obj['favouritepools'].push({ "name": poolNameString, "pool_id": poolId, "url_png_logo": url_png_logo, "description": description });
            var jsonStr = JSON.stringify(obj);
            localStorage.setItem('favouritepools', jsonStr);
        }

    }

    isPoolFavourite(poolName) {
        var poolNameString = poolName[0];
        var storage = localStorage.getItem('favouritepools');
        if (storage != null) {
            var obj = JSON.parse(storage);
            var foundPool = false;
            obj.favouritepools.forEach((item) => {
                if (item.name == poolNameString) {
                    foundPool = true;
                    return;
                }
            });
            this.setState({ favourite: foundPool });
        } else {
            this.setState({ favourite: false });
        }
    }

    addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    render() {
        return (
            < div >

                <Page
                    className="PoolDetailsComponent"
                    title=""
                // breadcrumbs={[{ name: 'Project Details' + ' / ' + this.props.match.params.projectname, active: true }]}
                >
                    <Row>
                        <Col xl={9} lg={9} md={12} sm={12} >
                            <Row>
                                <Col xl={12} lg={12} md={12} sm={12} >
                                    <Card>
                                        <CardBody style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}>
                                            <Row>
                                                <Col xl={2} lg={2} md={12} sm={12} >
                                                    <ReactImageFallback
                                                        src={this.props.pool.extended_meta.url_png_logo}
                                                        width="140"
                                                        height="140"
                                                        fallbackImage={CardanoImage} />
                                                </Col>
                                                <Col xl={8} lg={10} md={12} sm={12} >
                                                    <Row style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        textAlign: 'center',
                                                    }}><h1>{ReactHtmlParser(this.props.pool.ticker)}</h1></Row>
                                                    <h1>{ReactHtmlParser(this.props.pool.name)}</h1>

                                                    {this.props.pool.retired != 'Y' ?

                                                        <h3>{ReactHtmlParser(linkifyHtml(this.props.pool.description, {
                                                            defaultProtocol: 'https'
                                                        }))}</h3>

                                                        :
                                                        <div>
                                                            <h1 style={{ color: 'red' }}>THIS POOL IS RETIRED!</h1>
                                                            <h3 style={{ color: 'red' }}>If staking with this pool, move your ADA to another pool.</h3>
                                                        </div>
                                                    }

                                                    {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}> */}

                                                    <h1>{this.addCommas(this.props.pool.live_stake)}₳</h1>
                                                    {/* </div> */}
                                                    <small><b>PoolID:</b>  {this.props.pool.pool_id}          </small>
                                                    <Tooltip
                                                        title="Copy Pool ID"
                                                        placement="left"
                                                    >
                                                        <CopyToClipboard text={this.props.pool.pool_id}
                                                            onCopy={() => this.setState({ copied: true })}
                                                        >
                                                            <FontAwesomeIcon icon={faClipboard} />
                                                        </CopyToClipboard>
                                                    </Tooltip>
                                                    <br></br>
                                                    <small><b>PoolView: </b> {this.props.pool.pool_view}          </small>
                                                    <Tooltip
                                                        title="Copy Pool View"
                                                        placement="left"
                                                    >
                                                        <CopyToClipboard text={this.props.pool.pool_view}
                                                            onCopy={() => this.setState({ copied: true })}
                                                        >
                                                            <FontAwesomeIcon icon={faClipboard} />
                                                        </CopyToClipboard>
                                                    </Tooltip>
                                                    {this.state.favourite == false &&
                                                        <div>
                                                            <IconButton onClick={() => {
                                                                this.handleFavourite(true)
                                                            }} aria-label="delete" color="primary">
                                                                <FavoriteBorderIcon></FavoriteBorderIcon>
                                                            </IconButton>
                                                        </div>

                                                    }
                                                    {this.state.favourite &&
                                                        <div>
                                                            <IconButton onClick={() => { this.handleFavourite(false) }} aria-label="delete" color="secondary">
                                                                <Favorite></Favorite>
                                                            </IconButton>
                                                            <small>Favourite pool</small>
                                                        </div>
                                                    }
                                                    {this.props.pool.retired != 'Y' && <JoinPool pool={this.props.pool} />}
                                                </Col>
                                                <Col xl={2} lg={2} md={12} sm={12} >
                                                    <ReactImageFallback
                                                        src={this.props.pool.extended_meta.url_png_logo}
                                                        width="140"
                                                        height="140"
                                                        fallbackImage={CardanoImage} />
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>


                            <Tabs
                                selectedIndex={this.state.selectedTab}
                                onSelect={(selectedTab) => this.setState({ selectedTab: selectedTab })}
                            >
                                <Card>
                                    <CardHeader>
                                        <TabList>
                                            <Tab><FontAwesomeIcon icon={faInfo} /> Info</Tab>
                                            {/* <Tab><FontAwesomeIcon icon={faPeopleCarry} /> Delegates</Tab> */}
                                            {width > 700 && <Tab><FontAwesomeIcon icon={faPeopleCarry} /> Delegates</Tab>}
                                            <Tab><FontAwesomeIcon icon={faDollarSign} /> Costs History</Tab>
                                            <Tab><FontAwesomeIcon icon={faCube} /> Block History</Tab>
                                            {width > 700 && <Tab><FontAwesomeIcon icon={faHistory} /> Stake History</Tab>}
                                            <Tab><FontAwesomeIcon icon={faAward} /> Badges</Tab>
                                        </TabList>
                                    </CardHeader>
                                    <CardBody>
                                        <TabPanel>
                                            {/* START INFO */}
                                            <div>
                                                <Row>
                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            <CardHeader>Pool Cost - Margin</CardHeader>
                                                            <CardBody>
                                                                <h2>{this.props.pool.margin_pct}%</h2>
                                                                <small>Pool Margin is the % of extra fee's a pool withdraws from block production rewards. The lower the better for delegates.</small>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            <CardHeader>Fixed Fee</CardHeader>
                                                            <CardBody>
                                                                <h2>{this.props.pool.cost_per_epoch}₳</h2>
                                                                <small>Fixed fee is the minimum amount of ADA a pool subtracts from block production rewards. The minimum is 340₳.</small>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>

                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            <CardHeader>Pledge</CardHeader>
                                                            <CardBody>
                                                                <h2>{this.props.pool.pledge}₳</h2>
                                                                <small>The amount of ADA the pool owner has pledged to the pool.</small>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>

                                                </Row>

                                                <Row>
                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            <CardHeader>Active Stake - Epoch {this.props.pool.active_stake_epoch}</CardHeader>
                                                            <CardBody >

                                                                <h2>{this.addCommas(this.props.pool.active_stake)}₳</h2>
                                                                <small>Amount of ADA staked to the pool this epoch.</small>

                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            <CardHeader>Live Stake</CardHeader>
                                                            <CardBody>

                                                                <h2>{this.addCommas(this.props.pool.live_stake)}₳</h2>
                                                                <small>Live amount of ADA staked to the pool.</small>

                                                            </CardBody>
                                                        </Card>
                                                    </Col>

                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            <CardHeader>Live Delegates</CardHeader>
                                                            <CardBody>
                                                                <h2>{this.props.pool.live_stake_delegator_count}</h2>
                                                                <small>Total amount of wallets staking to this pool.</small>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                {this.props.pool.block_history != null && this.props.pool.block_history.length > 0 &&
                                                    <Row>
                                                        {this.calculateLuck() != null &&
                                                            <Col xl={4} lg={4} md={12} sm={12}>
                                                                <Card>
                                                                    <CardHeader>Luck Last Epoch</CardHeader>
                                                                    <CardBody>
                                                                        <h2>{"" + this.calculateLuck()}%</h2>
                                                                        <small>This is the amount of luck this pool received last Epoch.</small>
                                                                    </CardBody>
                                                                </Card>
                                                            </Col>}

                                                        <Col xl={4} lg={4} md={12} sm={12}>
                                                            <Card>
                                                                <CardHeader>Blocks This Epoch</CardHeader>
                                                                <CardBody >
                                                                    <h2>{this.props.pool.block_history[0].blocks}</h2>
                                                                    <small>Blocks produced by the pool in current Epoch, potential for more blocks.</small>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                        <Col xl={4} lg={4} md={12} sm={12}>
                                                            {/* <Card>
                                                                <CardHeader>Lifetime Blocks</CardHeader>
                                                                <CardBody >
                                                                    <Row>
                                                                        <div>
                                                                            <h2>{this.props.pool.blocks}</h2>
                                                                            <small>Amount of blocks this pool has minted.</small>
                                                                        </div>
                                                                    </Row>
                                                                </CardBody>
                                                            </Card> */}
                                                            <Card>
                                                                <CardHeader><b></b>Lifetime Blocks</CardHeader>
                                                                <CardBody >
                                                                    <h2>{this.props.pool.blocks}</h2>
                                                                    <small>Amount of blocks this pool has minted.</small>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                        {/* <Col xl={4} lg={4} md={12} sm={12}>
                                                            <Card style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                            }}>
                                                                <CardHeader style={{
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    width: '100%',
                                                                }}>Lifetime Luck</CardHeader>
                                                                <CardBody >
                                                                    <Row>
                                                                        <div>
                                                                            <h2>{this.calculateTotalLuck()}</h2>
                                                                            <small>How well this pool has performed in terms of ADA rewards.</small>
                                                                        </div>
                                                                    </Row>
                                                                </CardBody>
                                                            </Card>
                                                        </Col> */}
                                                    </Row>}
                                            </div>
                                            {/* END INFO */}
                                        </TabPanel>
                                        {width > 700 && <TabPanel>
                                            {/* START DELEGATES */}
                                            {this.props.pool &&
                                                <div>
                                                    <PoolDelagates pool={this.props.pool} delegatesList={this.state.delegatesList} />
                                                </div>}
                                            {/* END DELEGATES */}
                                        </TabPanel>}
                                        <TabPanel>
                                            {/* Start Costs history */}
                                            <Card>
                                                < CardHeader>Costs History
                                                    <br></br>
                                                    <small>Cost history keeps a track of the margin and fixed cost of a pool</small><br></br>
                                                    <small>Margin is the % amount a stake pool takes from the rewards - the lower the better</small>
                                                    <br></br>
                                                    <small>Fixed Cost is the minimum amount a pool owner earns - 340 is the minimum</small>
                                                    <br></br>
                                                    <br></br>
                                                    <small>Honest and well run pools shouldnt change very often, unless they have stated otherwise.</small>
                                                </CardHeader>
                                                <CardBody>
                                                    {this.props.pool && <PoolCosts pool={this.props.pool} />}
                                                </CardBody>

                                            </Card>
                                            {/* End Costs history */}
                                        </TabPanel>
                                        <TabPanel>
                                            {/* Start Block history */}
                                            <Card>
                                                < CardHeader>Blocks
                                                    <br></br>
                                                    <small>* Current Epoch, potential for more blocks.</small><br></br>
                                                    <small>After epoch transition the * Current Epoch will look invalid as we process.</small>
                                                </CardHeader>
                                                <CardBody>
                                                    {this.props.pool && <PoolBlocks pool={this.props.pool} />}
                                                    {/* <p>Currently under construction!</p> */}
                                                </CardBody>

                                            </Card>
                                            {/* End Block history */}
                                        </TabPanel>
                                        {width > 700 && <TabPanel>
                                            {/* Start Stake history */}
                                            <Card>
                                                <CardHeader>Active Stake - History<br></br><small>We are aware of a small bug on this data with missing stake.</small></CardHeader>
                                                <CardBody>
                                                    {(width > 600 && this.props.pool.active_stake_history != null && this.props.pool.active_stake_history.length > 0) &&
                                                        <Chart data={this.props.pool.active_stake_history} currentEpoch={this.props.pool.active_stake_epoch} currentActiveStake={this.props.pool.active_stake} />
                                                    }
                                                </CardBody>

                                            </Card>
                                            {/* End Stake history */}
                                        </TabPanel>}

                                        <TabPanel>
                                            {/* Start Badges */}
                                            <Card>
                                                <CardHeader>Badges earned by the pool.</CardHeader>
                                                <CardBody>
                                                    <PoolBadges poolBlocksTotal={this.props.pool.blocks} />
                                                </CardBody>

                                            </Card>
                                            {/* End Badges */}
                                        </TabPanel>
                                    </CardBody>
                                </Card>
                            </Tabs>

                        </Col>
                        <Col xl={3} lg={3} md={12} sm={12}>
                            <Row>
                                <Col>
                                    <Card>
                                        <CardHeader>Pool Links</CardHeader>
                                        <CardBody>
                                            {!isEmpty(this.props.pool.homepage) && (
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <Button variant="outline-light"><a href={this.props.pool.homepage} target="_blank" rel="noreferrer">Website</a></Button>
                                                    <br /><br />
                                                </div>
                                            )}
                                            <SocialMedia extendedmeta={this.props.pool.extended_meta} item={this.props.pool} />
                                        </CardBody>
                                    </Card>

                                    {/* {this.state.delegateHistory != null &&
                                        <Card>
                                            <CardHeader>
                                                <h6>Stake Feed</h6><small>Tracking delegate changes, currently in Beta</small></CardHeader>
                                            <CardBody style={{
                                                height: 300,
                                                overflow: 'auto'
                                            }}>

                                                <Col>
                                                    {
                                                        this.state.delegateHistory.map(function (delegate, index) {
                                                            return (
                                                                <Row style={{
                                                                    alignContent: 'center', justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    textAlign: 'center',
                                                                    marginBottom: '5px'
                                                                }}>
                                                                    <Col>
                                                                        {delegate.movedpool == 'Y' ?
                                                                            <div>
                                                                                <h6 style={{ marginBottom: '0px', paddingBottom: '0px', color: 'red' }}>-{delegate.stake_amount}</h6>
                                                                                <small>{delegate.stake_address.substring(0, 20)}</small>
                                                                                <h6 style={{ marginBottom: '0px', paddingBottom: '0px', color: 'red' }}><b>{ReactHtmlParser(delegate.pool_ticker)} - {delegate.new_pool_ticker}</b></h6>
                                                                            </div>
                                                                            :
                                                                            delegate.stake_amount_change != null && delegate.stake_amount_change.includes("-") ?
                                                                                <div>
                                                                                    <small style={{ marginBottom: '0px', paddingBottom: '0px', color: 'red' }}>{delegate.stake_amount_change}</small><br></br>
                                                                                    <small>{delegate.stake_address.substring(0, 20)}</small>
                                                                                    <h6 style={{ marginBottom: '0px', paddingBottom: '0px' }}><b>{delegate.stake_amount}</b></h6>

                                                                                </div>
                                                                                :
                                                                                delegate.stake_amount_change == null ?
                                                                                    <div>
                                                                                        <h6 style={{ marginBottom: '0px', paddingBottom: '0px', color: 'green' }}>+{delegate.stake_amount}</h6>
                                                                                        <small>{delegate.stake_address.substring(0, 20)}</small>
                                                                                        <h6 style={{ marginBottom: '0px', paddingBottom: '0px', color: 'green' }}><b>{delegate.previous_pool_ticker} - {ReactHtmlParser(delegate.pool_ticker)}</b></h6>

                                                                                    </div>
                                                                                    :
                                                                                    <div>
                                                                                        <small style={{ color: 'green' }}>+{delegate.stake_amount_change}</small><br></br>
                                                                                        <small>{delegate.stake_address.substring(0, 20)}</small>
                                                                                        <h6 style={{ marginBottom: '0px', paddingBottom: '0px' }}><b>{delegate.stake_amount}</b></h6>

                                                                                    </div>
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })

                                                    }</Col>


                                            </CardBody>
                                        </Card>} */}


                                    {!isEmpty(this.props.pool.extended_meta.twitter_handle) &&
                                        <Card>
                                            <CardHeader>
                                                Twitter Feed</CardHeader>
                                            <CardBody style={{
                                                height: 350,
                                                overflow: 'auto'
                                            }}>

                                                {/* <a class="twitter-timeline" href={this.state.twitterUrl}></a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> */}

                                                {/* <Timeline
                                                dataSource={{
                                                    sourceType: 'profile',
                                                    screenName: 'TwitterDev'
                                                }}
                                                options={{
                                                    height: '400'
                                                }}/> */}


                                                <TwitterTimelineEmbed
                                                    sourceType="profile"
                                                    screenName={this.state.twitterUrl}
                                                    // screenName="PoolShamrock"
                                                    options={{ height: 400 }}
                                                />

                                            </CardBody>
                                        </Card>}



                                    {!isEmpty(this.props.pool.extended_meta.location) &&
                                        <Card>
                                            <CardHeader>
                                                Pool Owner Location</CardHeader>
                                            <CardBody>
                                                <h2>{this.props.pool.extended_meta.location}</h2>
                                            </CardBody>
                                        </Card>}

                                    <Card>
                                        <CardHeader>
                                            Share Pool</CardHeader>
                                        <CardBody>
                                            <ShareProject name={this.props.pool.pool_id} />
                                            <p><Button variant="outline-light" size="sm" onClick={() => {
                                                this.requestPoolPromotion(this.props.pool.pool_id)
                                            }}
                                            >Request Promotion</Button></p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>


                    {/* <Row>
                            <Col>
                                {this.state.project.relatedProjects != null && this.state.project.relatedProjects.length > 0 &&
                                    <Card>
                                        <CardHeader style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            borderRadius: '1.9em'
                                        }}>Similar Projects</CardHeader>
                                        <Row>
                                            {
                                                this.state.project.relatedProjects.map(function (relatedProject, index) {
                                                    return (
                                                        <Col lg={3} md={10} sm={10} xs={12} className="mb-3">
                                                            <SimilarProjectCard
                                                                img={relatedProject.imageUrl}
                                                                projectDetails={relatedProject}
                                                                myprojectspage={false} />
                                                        </Col>
                                                    )
                                                })

                                            }</Row>
                                    </Card>}
                                <Card body style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: 'none',
                                }}>
                                    <p><b>Project Added on </b>{this.state.project.createdDate.split('T')[0]}  |  <b>Last Updated on </b>{this.state.project.updatedDate.split('T')[0]}</p>
                                </Card>
                            </Col>
                        </Row> */}

                    <Modal
                        isOpen={this.state.modal}
                        toggle={false}
                    >
                        <ModalHeader toggle={() => this.toggle()}>Request Pool Promotion</ModalHeader>
                        <ModalBody>
                            <Row>
                                <p>Hello {this.props.pool.ticker} thanks for your request for promotion.</p>
                            </Row>

                            <Row>
                                {this.state.requestpromotion_status == 200 ?
                                    <div>
                                        <p>Your request has been <b>successful</b> your advert is in the queue.</p>
                                        <p><b>Start Time:</b> {this.state.requestpromotion_start} UTC</p>
                                        <p><b>End Time:</b> {this.state.requestpromotion_end} UTC</p>

                                        {/* {this.props.pool.live_stake < 10000000 &&
                                            <p>As your live stake is lower than 10Mil we will add your to our twitter promotion lottery where we randomly select 3 pools to promote.</p>
                                        } */}
                                        <br></br>
                                    </div>
                                    :
                                    <p>Your request has been <b>unsuccessful</b>, its likely your already in the queue.</p>
                                }
                            </Row>

                        </ModalBody>

                    </Modal>

                </Page >

            </div >
        );
    }
};

