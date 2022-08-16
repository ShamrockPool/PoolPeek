import Page from 'components/Page';
import React from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Table,
  Button
} from 'reactstrap';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrlPoolPeekService, getAlliancePools } from 'assets/services';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram, faYoutube, faFacebook, faDiscord } from "@fortawesome/free-brands-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import Timer from "react-compound-timer";
import { FormControlLabel, Switch } from '@material-ui/core';
import ReactImageFallback from "react-image-fallback";
import SocialMedia from 'components/SocialMedia';
import ReactHtmlParser from 'react-html-parser';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { isEmpty } from 'utils/stringutil.js';
import PoolCard from 'components/Card/PoolCard';
var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;


const tableRowStyle = {
  // borderBottom: 'solid 3px blue',
  // background: 'green',
  color: 'green',
  fontWeight: 'bold',
  // padding: 0,
};

const tableRowStyleBad = {
  // borderBottom: 'solid 3px blue',
  // background: 'green',
  color: 'red',
  fontWeight: 'bold',
  // textDecoration: 'line-through'

  // padding: 0,
};

const tableRowStyleWarning = {
  // borderBottom: 'solid 3px blue',
  // background: 'green',
  color: 'orange',
  fontWeight: 'bold',
  // textDecoration: 'line-through'

  // padding: 0,
};

class AllianceDetailsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    pools: null,
    loading: true,
    totalPools: '',
    smallScreen: false,
    searched: "",
    filterAblepools: [],
    stats: null,
    namiEnabled: false,
    sortOrder: 'desc',
    timerReset: null,
    refreshAmount: 60000,
    autorefresh: false,
    twitterUrl: "",
    allianceData: [],
    allianceDataPoolsCount: 0
  };

  async componentDidMount() {

    var title = this.props.title;

    if (width < 600) {
      this.setState({ smallScreen: true });
    }
    await this.getPools();
  }

  async refresher(refresh) {
    while (refresh) {
      await this.sleep(this.state.refreshAmount);
      this.getPools();
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getPools() {
    try {
      this.setState({ timerReset: null })

      const alliancePost = {
        name: this.props.alliancename,
        url: this.props.url
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alliancePost)
      };
      var response = await fetch(baseUrlPoolPeekService + getAlliancePools, requestOptions);
      const data = await response.json();
      this.getTwitterName(data.twitter_handle);
      var pools = data.pools;

      this.setState({ allianceData: data, allianceDataPoolsCount: pools.length ,timerReset: this.state.refreshAmount, loading: false })
    } catch (error) {
      console.log(error)
    }
  }

  createRows(data) {
    var rows = [];

    var poolsList = [];
    poolsList = data.pools;
    this.setState({ loading: false, filterAblePools: poolsList })
  }

  handleRowClick(rowData) {
    var url = '/pool/' + rowData.pool_id;
    this.props.history.push(url);
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

  onSort(event, sortKey) {
    //get current sort order
    if (this.state.sortOrder == 'desc') {
      if (sortKey == 'name' || sortKey == 'ticker') {
        const data = this.state.filterAblePools;
        data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({ loading: false, filterAblePools: data })
      } else {
        const data = this.state.filterAblePools;
        data.sort((a, b) => Number(a[sortKey]) - (Number(b[sortKey])))
        this.setState({ loading: false, filterAblePools: data })
      }
      this.setState({ sortOrder: 'asc' })
    } else {
      if (sortKey == 'name' || sortKey == 'ticker') {
        const data = this.state.filterAblePools;
        data.sort((a, b) => b[sortKey].localeCompare(a[sortKey]))
        this.setState({ loading: false, filterAblePools: data })
      } else {
        const data = this.state.filterAblePools;
        data.sort((a, b) => Number(b[sortKey]) - (Number(a[sortKey])))
        this.setState({ loading: false, filterAblePools: data })
      }
      this.setState({ sortOrder: 'desc' })
    }


  }

  handleAdvancedClick() {
    if (this.state.autorefresh) {
      this.setState({ autorefresh: false });
      this.refresher(false);
    }
    else {
      this.setState({ autorefresh: true });
      this.refresher(true);
    }
  }

  getRowStyle(pct_saturated) {

    if (pct_saturated > 90 && pct_saturated < 100) {
      return tableRowStyleWarning;
    } else if (pct_saturated > 100) {
      return tableRowStyleBad;
    }
    else {
      return tableRowStyle
    }
  }

  getTwitterName(handle) {
    if (handle != null && !isEmpty(handle)) {
      var name = handle.replace('https://twitter.com/', '');
      name = name.replace('@', '');
      var url = "https://twitter.com/" + name + "?ref_src=twsrc%5Etfw";
      this.setState({ twitterUrl: name });
    }
  }

  shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  render() {

    return (
      <Page
        className="AllianceDetailsPage"
        title={this.props.title}
      >
        {this.state.loading == false &&
          <Row>
            <Col xl={9} lg={9} md={12} sm={12} >
              <Row>
                <Card>
                  <CardBody style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Row style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                      <Col xl={2} lg={2} md={12} sm={12} >
                        <ReactImageFallback
                          src={this.state.allianceData.url_png_logo}
                          width="140"
                          height="140"
                          fallbackImage={CardanoImage} />
                      </Col>
                      <Col xl={5} lg={5} md={12} sm={12} >
                        <Row style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}><h1><b>{ReactHtmlParser(this.state.allianceData.name)}</b></h1></Row>
                        {/* <h2>{ReactHtmlParser(this.state.allianceData.description_short)}</h2> */}

                        <Row style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}>
                          <Col xl={4} lg={4} md={12} sm={12} >
                            <h3>Pools</h3>
                            <h3><b>{this.state.allianceDataPoolsCount}</b></h3>
                          </Col>

                        </Row>
                        
                        <Row style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}>
                          <Col xl={4} lg={4} md={12} sm={12} >
                            <h3>Live Stake</h3>
                            <h3><b>{this.state.allianceData.total_live_stake}₳</b></h3>
                          </Col>

                          <Col xl={4} lg={4} md={12} sm={12} >
                            <h3>Live Delegates</h3>
                            <h3><b>{this.state.allianceData.total_live_delegates}</b></h3>
                          </Col>
                        </Row>
                      </Col>

                      <Col xl={2} lg={2} md={12} sm={12} >
                        <ReactImageFallback
                          src={this.state.allianceData.url_png_logo}
                          width="140"
                          height="140"
                          fallbackImage={CardanoImage} />
                      </Col>
                    </Row>



                    <Row style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: 15
                    }}>
                      <h4>{ReactHtmlParser(linkifyHtml(this.state.allianceData.description_long, {
                        defaultProtocol: 'https'
                      }))}</h4>
                    </Row>



                  </CardBody>
                </Card>

              </Row>

              <Row>
                {this.shuffle(this.state.allianceData.pools).map(function (item, key) {
                  return (
                    <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                      <div className='ProjectCards'>
                        <PoolCard
                          img={item.extended_meta.url_png_logo}
                          pool={item} />
                      </div>
                    </Col>
                  )
                })
                }
              </Row>


            </Col>



            <Col xl={3} lg={3} md={12} sm={12}>
              <Row>
                <Col>
                  <Card>
                    <CardHeader>Alliance Links</CardHeader>
                    <CardBody>
                      {!isEmpty(this.state.allianceData.website) && (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <Button variant="outline-light"><a href={this.state.allianceData.website} target="_blank" rel="noreferrer">Alliance Website</a></Button>
                          <br /><br />
                        </div>
                      )}

                      {this.state.allianceData.twitter_handle !== "" &&
                        <Tooltip
                          title="Alliance Twitter"
                          placement="left"
                        >
                          <a href={"https://twitter.com/@" + this.state.allianceData.twitter_handle} target="_blank" rel="noreferrer">
                            <img
                              className="pr-2"
                              alt=""
                            />
                            <FontAwesomeIcon size="2x" icon={faTwitter} /></a></Tooltip>}

                      {this.state.allianceData.telegram_handle != "" &&
                        <Tooltip
                          title="Alliance Telegram"
                          placement="left"
                        >
                          <a href={"https://t.me/" + this.state.allianceData.telegram_handle} target="_blank" rel="noreferrer">
                            <img
                              className="pr-2"
                              alt=""
                            /> <FontAwesomeIcon size="2x" icon={faTelegram} /></a></Tooltip>}

                      {this.state.allianceData.youtube_handle != "" &&
                        <Tooltip
                          title="Alliance Youtube"
                          placement="left"
                        >
                          <a href={"https://www.youtube.com/channel/" + this.state.allianceData.youtube_handle} target="_blank" rel="noreferrer">
                            <img
                              className="pr-2"
                              alt=""
                            /> <FontAwesomeIcon size="2x" icon={faYoutube} /></a></Tooltip>}

                      {this.state.allianceData.facebook_handle != "" &&
                        <Tooltip
                          title="Alliance Facebook"
                          placement="left"
                        >
                          <a href={"https://www.facebook.com/" + this.state.allianceData.facebook_handle} target="_blank" rel="noreferrer">
                            <img
                              className="pr-2"
                              alt=""
                            /> <FontAwesomeIcon size="2x" icon={faFacebook} /></a></Tooltip>}

                      {this.state.allianceData.discord_handle != "" &&
                        <Tooltip
                          title="Alliance Discord"
                          placement="left"
                        >
                          <a href={"https://discord.com/invite/" + this.state.allianceData.discord_handle} target="_blank" rel="noreferrer">
                            <img
                              className="pr-2"
                              alt=""
                            /> <FontAwesomeIcon size="2x" icon={faDiscord} /></a></Tooltip>}

                    </CardBody>
                  </Card>

                  {!isEmpty(this.state.allianceData.twitter_handle) &&
                    <Card>
                      <CardHeader>
                        Allience Twitter Feed</CardHeader>
                      <CardBody style={{
                        height: 450,
                        overflow: 'auto'
                      }}>
                        <TwitterTimelineEmbed
                          sourceType="profile"
                          screenName={this.state.twitterUrl}
                          options={{ height: 400 }}
                        />

                      </CardBody>
                    </Card>}
                  {/* 
                                    <Card>
                                        <CardHeader>
                                            Share Alliance</CardHeader>
                                        <CardBody>
                                            <ShareProject name={this.props.pool.pool_id} />
                                        </CardBody>
                                    </Card> */}
                </Col>
              </Row>
            </Col>
          </Row>}

      </Page>
    );
  }
}
export default AllianceDetailsPage;