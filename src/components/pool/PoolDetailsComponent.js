import React, { useState } from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Page from 'components/Page';
import ShareProject from '../../components/ShareProject';
import PoolDelagates from 'components/pool/PoolDelagates';
import PoolBlocks from 'components/pool/PoolBlocks';
import { css } from "@emotion/core";
import { isEmpty } from 'utils/stringutil.js';
import "react-tabs/style/react-tabs.css";
import "../../styles/components/Table.css";
import { Card, CardBody, CardHeader, Col, Row, Table, Button, CardTitle, CardText } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'; // eslint-disable-line
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactImageFallback from "react-image-fallback";
import SocialMedia from '../SocialMedia';
import ReactHtmlParser from 'react-html-parser';
import { faInfo, faDatabase, faPeopleCarry, faShare, faCube } from '@fortawesome/free-solid-svg-icons';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import Chart from '../Chart';
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

export default class PoolDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            selectedTab: 0,
            loading: true
        };

    }
    componentDidMount() {

    }


    getTwitterName(handle) {
        var name = handle.replace('https://twitter.com/', '');
        name = name.replace('@', '');
        return name;
    }

    render() {
        return (
            < div >

                <Page
                    className="PoolDetailsComponent"
                    title=""
                // breadcrumbs={[{ name: 'Project Details' + ' / ' + this.props.match.params.projectname, active: true }]}
                >

                    <Row
                        style={{
                            justifyContent: 'left',
                            alignItems: 'top',
                        }}>
                        <Col xl={8} lg={12} md={12} sm={6}>
                            <Row>
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col sm={2}>
                                                <ReactImageFallback
                                                    src={this.props.pool.extended_meta.url_png_logo}
                                                    width="140"
                                                    height="140"
                                                    fallbackImage={CardanoImage} />
                                            </Col>
                                            <Col sm={8}>
                                                <h1>{ReactHtmlParser(this.props.pool.name)}({ReactHtmlParser(this.props.pool.ticker)})</h1>
                                                <h3>{ReactHtmlParser(linkifyHtml(this.props.pool.description, {
                                                    defaultProtocol: 'https'
                                                }))}</h3>

                                                <small>{this.props.pool.pool_id}    </small>
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
                                            </Col>
                                        </Row>
                                    </CardBody>

                                </Card>

                            </Row>

                            <Tabs
                                selectedIndex={this.state.selectedTab}
                                onSelect={(selectedTab) => this.setState({ selectedTab: selectedTab })}
                            >
                                <Card>
                                    < CardHeader style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        borderRadius: 'none',
                                    }}>
                                        <TabList>
                                            <Tab><FontAwesomeIcon icon={faInfo} /> Info</Tab>
                                            <Tab><FontAwesomeIcon icon={faPeopleCarry} /> Delegates</Tab>
                                        </TabList>
                                    </CardHeader>
                                    <CardBody>
                                        <TabPanel>
                                            {/* START INFO */}
                                            <div>
                                                <Row>
                                                    <Col xl={6} lg={6} md={12} sm={12}>
                                                        <Card>
                                                            < CardHeader style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                borderRadius: 'none',
                                                            }}>Pool Cost - Margin</CardHeader>
                                                            <CardBody style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                            }}>
                                                                <Row>
                                                                    <div>
                                                                        <h2>{this.props.pool.margin_pct}%</h2>
                                                                        <small>Pool Margin is the % of extra fee's a pool withdraws from block production rewards. The lower the better for delegates.</small>
                                                                    </div>
                                                                </Row>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={12} sm={12}>
                                                        <Card>
                                                            <CardHeader style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                borderRadius: 'none',
                                                            }}>Fixed Fee</CardHeader>
                                                            <CardBody style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                            }}>
                                                                <Row>
                                                                    <div>
                                                                        <h2>{this.props.pool.cost_per_epoch}₳</h2>
                                                                        <small>Fixed fee is the minimum amount of ADA a pool subtracts from block production rewards. The minimum is 340₳.</small>
                                                                    </div>
                                                                </Row>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            < CardHeader style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                borderRadius: 'none',
                                                            }}>Active Stake - Epoch {this.props.pool.active_stake_epoch}</CardHeader>
                                                            <CardBody style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                            }}>
                                                                <Row>
                                                                    <div>
                                                                        <h2>{this.props.pool.active_stake}₳</h2>
                                                                        <small>Amount of ADA staked to the pool this epoch.</small>
                                                                    </div>
                                                                </Row>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            < CardHeader style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                borderRadius: 'none',
                                                            }}>Live Stake</CardHeader>
                                                            <CardBody style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                            }}>
                                                                <Row>
                                                                    <div>
                                                                        <h2>{this.props.pool.live_stake}₳</h2>
                                                                        <small>Live amount of ADA staked to the pool.</small>
                                                                    </div>
                                                                </Row>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                    <Col xl={4} lg={4} md={12} sm={12}>
                                                        <Card>
                                                            < CardHeader style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                borderRadius: 'none',
                                                            }}>Live Delegates</CardHeader>
                                                            <CardBody style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                            }}>
                                                                <Row>
                                                                    <div>
                                                                        <h2>{this.props.pool.live_stake_delegator_count}</h2>
                                                                        <small>Total amount of wallets staking to this pool.</small>
                                                                    </div>
                                                                </Row>
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xl={6} lg={6} md={12} sm={12}>
                                                        <Card>
                                                            < CardHeader style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                borderRadius: 'none',
                                                            }}>Active Stake - History</CardHeader>
                                                            <CardBody style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                            }}>
                                                                {(width > 600 && this.props.pool.active_stake_history.length > 0) &&
                                                                    <Chart data={this.props.pool.active_stake_history} currentEpoch={this.props.pool.active_stake_epoch} currentActiveStake={this.props.pool.active_stake} />
                                                                }
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                    <Col xl={6} lg={6} md={12} sm={12}>
                                                        <Card>
                                                            < CardHeader style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                width: '100%',
                                                                borderRadius: 'none',
                                                            }}>Blocks <small>* Current Epoch.</small></CardHeader>
                                                            <CardBody style={{
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                textAlign: 'center',
                                                            }}>
                                                                {this.props.pool && <PoolBlocks pool={this.props.pool} />}
                                                            </CardBody>

                                                        </Card>
                                                    </Col>
                                                </Row>
                                            </div>
                                            {/* END INFO */}
                                        </TabPanel>
                                        <TabPanel>
                                            {/* START DELEGATES */}
                                            {this.props.pool &&
                                                <div>
                                                    <PoolDelagates pool={this.props.pool} />
                                                </div>}
                                            {/* END DELEGATES */}
                                        </TabPanel>
                                    </CardBody>

                                </Card>



                            </Tabs>




                        </Col>

                        <Col md={2} sm={6} lg={3} xs={12} className="mb-3">
                            <Row style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Col>
                                    <Card style={{
                                        alignItems: 'center'
                                    }}>

                                        < CardHeader style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            borderRadius: '1.9em'
                                        }}>Pool Links</CardHeader>

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

                                    {!isEmpty(this.props.pool.extended_meta.twitter_handle) &&
                                        <Card>
                                            <CardHeader style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                borderRadius: 'none',
                                            }}>
                                                Twitter Feed</CardHeader>
                                            <CardBody style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}>
                                                <TwitterTimelineEmbed
                                                    sourceType="profile"
                                                    screenName={this.getTwitterName(this.props.pool.extended_meta.twitter_handle)}
                                                    // screenName="PoolShamrock"
                                                    options={{ height: 400 }}
                                                />
                                            </CardBody>
                                        </Card>}

                                    {!isEmpty(this.props.pool.extended_meta.location) &&
                                        <Card>
                                            <CardHeader style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                width: '100%',
                                                borderRadius: 'none',
                                            }}>
                                                Pool Owner Location</CardHeader>
                                            <CardBody style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                            }}>
                                                <h2>{this.props.pool.extended_meta.location}</h2>
                                            </CardBody>
                                        </Card>}

                                    <Card>
                                        <CardHeader style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '100%',
                                            borderRadius: 'none',
                                        }}>
                                            Share Pool</CardHeader>
                                        <CardBody style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center',
                                        }}>
                                            <ShareProject name={this.props.pool.pool_id} />
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

                </Page>

            </div >
        );
    }
};

