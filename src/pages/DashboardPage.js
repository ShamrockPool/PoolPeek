import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
import {
  teamPeekData,
} from 'demos/dashboardPage';

import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  Table,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardText,
  Button,
  Input
} from 'reactstrap';
import googleAppStore from 'assets/img/google_plays.png';
import appAppStore from 'assets/img/apple_store.png';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { isEmpty } from 'utils/stringutil.js';
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import {
  baseUrl, baseUrlPoolPeekService, dashboardData, getPoolByStakeAddress, getPoolAdvertising, getPoolForSearchList,
  chainLoadData
} from '../assets/services';
import Favorite from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import { connect } from 'react-redux';
import ppc from 'assets/img/PKCoin2.m4v';
import LoadChart from 'components/LoadChart';
import BlocksPage from './BlocksPage';
var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;
const cardano = window.cardano;


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function checkIsImageUrl(url) {
  if (isEmpty(url)) {
    return false;
  }
  if (url.startsWith("https") && (url.endsWith(".png") || url.endsWith(".jpeg"))) {
    return true;
  }
  return false;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class DashboardPage extends React.Component {


  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    backdrop: true,
    loading: true,
    liveStake: '',
    totalWalletsStaked: '',
    totalAdaSupply: '',
    modalImageWidth: 450,
    percentageOfSupplyStaked: 0,
    allpools: null,
    filteredPools: null,
    favouritepools: [],
    epochSecondsRemaining: 0,
    searchInput: null,
    namiEnabled: false,
    namiPool: null,
    advertisingpool: null,
    chainLoadData: null
  };

  toggle = modalType => () => {
    if (!modalType) {
      return this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  async connectWallet() {
    console.log("Connect Nami");
    var namiEnabled = await cardano.enable();
    this.setState({ namiEnabled: namiEnabled });
    // await this.getNamiPool();
  };

  async componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);

    await this.getDashboardData();
    await this.getChainLoadData();

    try {
      var namiEnabled = await cardano.nami.isEnabled()
      this.setState({ namiEnabled: namiEnabled });

      if (this.state.namiEnabled) {
        await this.getNamiPool();
      }

    } catch (error) {
    }

    this.getFavouritePools();
    //this.generateEpochEvents();

    if (width < 600) {
      this.setState({ modal: false, modalImageWidth: width / 1.2 });
    }

    this.teamPeekData = teamPeekData;//shuffle(teamPeekData);



  }

  // async getNamiPool() {
  //   try {
  //     const walletAddress = await window.cardano.getRewardAddress();
  //     console.log(walletAddress);
  //     const Loader = await import('@emurgo/cardano-serialization-lib-browser');
  //     var walletAddressHex = Buffer.from(
  //       walletAddress,
  //       'hex'
  //     );
  //     var addressFromBytes = Loader.Address.from_bytes(walletAddressHex);
  //     var rewardAddress = Loader.RewardAddress.from_address(addressFromBytes)?.to_address().to_bech32();

  //     var response = await fetch(baseUrlPoolPeekService + getPoolByStakeAddress + rewardAddress);
  //     var data = await response.json();
  //     var pool = data.pools[0];
  //     this.setState({ namiPool: pool });
  //     this.state.namiPool = pool;
  //   } catch (error) {

  //   }

  // }

  async getChainLoadData() {
    var response = await fetch(baseUrl + chainLoadData);
    var data = await response.json();
    this.setState({ chainLoadData: data });
  }

  async getDashboardData() {
    this.getDashboardStatsData();
    await this.getAllPools();
    await this.getAdvertisingPool();
    this.setState({
      loading: false
    });
  }

  generateEpochEvents() {
    var epochDate = new Date(2017, 8, 23, 21, 44, 59);
    var today = new Date(new Date().toUTCString());
    var endDate = new Date(today.getFullYear(), 12, 31, 21, 45);

    var epoch = 0;
    var epochLength = 5;

    while (epochDate.getTime() < endDate.getTime()) {
      var epochEndDate = new Date(epochDate);
      epochEndDate.setDate(epochEndDate.getDate() + epochLength);

      if (today > epochDate && today < epochEndDate) {
        var timeInEpoch = epochEndDate.getTime() - new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
        this.state.epochSecondsRemaining = timeInEpoch;


      }
      epoch++;
      epochDate = new Date(epochEndDate);
    }
  }

  async getAllPools() {
    var response = await fetch(baseUrlPoolPeekService + getPoolForSearchList);
    var data = await response.json();
    //console.log(data);
    this.setState({ allpools: data.pools });
    this.setState({ filteredPools: data.pools });
  }

  // async getPoolList() {
  //   var response = await fetch(baseUrlPoolPeekService + getPoolForRecommendedList);
  //   var data = await response.json();
  //   //console.log(data);
  //   this.setState({ pools: data.pools });
  // }

  async getAdvertisingPool() {
    var response = await fetch(baseUrlPoolPeekService + getPoolAdvertising);

    if (response.status == 200) {
      var data = await response.json();
      if (data != null) {
        this.setState({ advertisingpool: data });
      }
    }
  }


  async getDashboardStatsData() {
    try {
      var response = await fetch(baseUrl + dashboardData);
      const data = await response.json();
      //console.log(data);

      this.setState({
        liveStake: data.liveStake, totalWalletsStaked: data.totalWalletsStaked, totalAdaSupply: data.totalAdaSupply,
        totalPools: data.totalPools, averageStakePerPool: data.averageStakePerPool
      });
      this.state.liveStake = data.liveStake;
      this.state.totalAdaSupply = data.totalAdaSupply;

      var adaSupply = parseFloat(data.liveStake.replace(/,/g, ''));
      var liveStake = parseFloat(data.totalAdaSupply.replace(/,/g, ''));
      var percentage = ((adaSupply / liveStake) * 100).toFixed(2)
      this.setState({
        percentageOfSupplyStaked: percentage
      });
    } catch (error) {

    }

  }


  isLoading() {
    if (this.state.loading || this.state.allpools == null) {
      return true;
    }
    else {
      return false;
    };
  }

  startWizard() {
    console.log("started");
  }

  getFavouritePools() {
    var storage = localStorage.getItem('favouritepools');
    if (storage != null) {
      var obj = JSON.parse(storage);

      this.setState({ favouritepools: obj.favouritepools });
    }
  }

  handleChange = (query) => (e) => {
    var input = e.target.value;
    var poolsToDisplay = this.state.allpools;
    // poolsToDisplay = this.state.allpools.filter(pool => pool.name.toLowerCase().includes(input.toLowerCase()) ||
    //   pool.ticker.toLowerCase().includes(input.toLowerCase()));

    //  poolsToDisplay = this.state.allpools.filter(pool => pool.ticker.toLowerCase() == (input.toLowerCase()) ||
    //   pool.ticker.toLowerCase().includes(input.toLowerCase()) ||
    //   pool.name.toLowerCase().includes(input.toLowerCase()) );

    if (input.length > 5) {
      poolsToDisplay = this.state.allpools.filter(pool => pool.name.toLowerCase().includes(input.toLowerCase()));
    } else {
      poolsToDisplay = this.state.allpools.filter(pool => pool.ticker.toLowerCase() == (input.toLowerCase()));
      if (poolsToDisplay.length == 0) {
        poolsToDisplay = poolsToDisplay.concat(this.state.allpools.filter(pool => pool.ticker.toLowerCase().startsWith(input.toLowerCase())));
      }
    }



    // poolsToDisplay = poolsToDisplay.concat(this.state.allpools.filter(pool => pool.ticker.toLowerCase().includes(input.toLowerCase())));
    // poolsToDisplay = poolsToDisplay.concat(this.state.allpools.filter(pool => pool.name.toLowerCase().includes(input.toLowerCase())));

    this.setState({ filteredPools: poolsToDisplay, searchInput: input });
  }

  render() {
    return (
      <Page
        className="DashboardPage"
      // title="Dashboard"
      // breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row style={{
          alignContent: 'center', justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='primary'>
              <CardBody>
                <CardTitle className="text-capitalize">
                  {this.state.totalPools}
                </CardTitle>
                <CardText>
                  <small>Stake Pools</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='secondary'>
              <CardBody>
                <CardTitle>
                  {this.state.totalAdaSupply}
                </CardTitle>
                <CardText>
                  <small>ADA Supply</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='primary'>
              <CardBody>
                <CardTitle className="text-capitalize">
                  {this.state.totalWalletsStaked}
                </CardTitle>
                <CardText>
                  <small>Staked Wallets</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='secondary'>
              <CardBody>
                <CardTitle className="text-capitalize">
                  {this.state.liveStake}
                </CardTitle>
                <CardText>
                  <small>ADA Staked</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='primary'>
              <CardBody body>
                <CardTitle className="text-capitalize">
                  {this.state.percentageOfSupplyStaked}
                </CardTitle>
                <CardText>
                  <small>% Of ADA Staked</small>
                </CardText>
              </CardBody>
            </Card>
          </Col>

          {/* <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='secondary'>
              <CardBody>
                <CardTitle className="text-capitalize">
                  {this.state.averageStakePerPool}
                </CardTitle>
                <CardText>
                  Average Per Pool
                </CardText>
              </CardBody>
            </Card>
          </Col> */}

        </Row>



        {/* <Row>
          <Col lg={4} md={12} sm={12} xs={4} className="mb-3">
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaMobileAlt}
              title="Mob APP"
              subtitle=""
              onClick={this.toggle()}
            />
          </Col>

          <Col lg={4} md={6} sm={6} xs={4} className="mb-3">
            <a href="https://t.me/poolpeek" target="_blank" rel="noreferrer"> <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaTelegram}
              title="Telegram"
              subtitle=""
            /></a>
          </Col>

          <Col lg={4} md={6} sm={6} xs={4} className="mb-3">
            <a href="https://twitter.com/CardanoPoolPeek" target="_blank" rel="noreferrer">
              <IconWidget
                bgColor="white"
                inverse={false}
                icon={FaTwitter}
                title="Twitter"
                subtitle=""
              />
            </a>
          </Col>
        </Row> */}

        <Modal
          isOpen={this.state.modal}
          toggle={false}
        >
          <ModalHeader toggle={this.toggle()}>Poolpeek Mobile</ModalHeader>
          <ModalBody>
            <Row>
              <p>Welcome - if you are viewing poolpeek using a mobile device you can download our App from the links below. </p>
              <Col>
                <a href="https://play.google.com/store/apps/details?id=com.colorworkapps.poolPeek" target="_blank" rel="noreferrer">
                  <img src={googleAppStore} width={this.state.modalImageWidth} alt='' /></a>
              </Col>
              <Col></Col>
              <Col>
                <a href="https://apps.apple.com/us/app/poolPeek/id1558648735" target="_blank" rel="noreferrer">
                  <img src={appAppStore} width={this.state.modalImageWidth} alt='' /></a>
              </Col>
            </Row>

          </ModalBody>
          <ModalFooter>
            {' '}
            <Button color="secondary" onClick={this.toggle()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
        {this.isLoading() ? <div><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
          :
          <Row>

            <Row>

              <Col lg={3} md={12} sm={12} xs={12} className="mb-3">

                <Card>
                  <CardHeader >
                    <h6><b>Favourite Pools</b></h6>
                    <Row style={{
                      alignContent: 'center', justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}><small>Click the <Favorite style={{ color: red, fill: '#FF0000' }}></Favorite> icon within pools to display here.</small>
                    </Row>
                  </CardHeader>
                  <CardBody body >
                    <Row style={{ margin: '1px' }}>

                      {this.state.favouritepools.map(function (item, index) {

                        return (

                          <Link to={`/pool/${item.pool_id}`}>
                            <h6>
                              {checkIsImageUrl(item.url_png_logo) ? (
                                <ReactImageFallback
                                  src={item.url_png_logo}
                                  width="40"
                                  height="40"
                                  fallbackImage={CardanoImage} />
                              ) : (<img
                                src={CardanoImage}
                                className="pr-2"
                                width="38"
                                height="32"
                              />)}
                              <b>&nbsp;{item.name}</b>
                            </h6>
                          </Link>

                        )
                      })
                      }

                    </Row>
                  </CardBody>
                </Card>

                <hr></hr>

                <Card>
                  <CardHeader >
                    <p><h6><b>Pool Search</b></h6></p><small>Quick search all available pools.</small>
                  </CardHeader>
                  <CardBody body >

                    <Input
                      style={{
                        fontSize: 14, alignContent: 'center', justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                      type="text"
                      className="cr-search-form__input"
                      placeholder="Search with Ticker or Pool Name"
                      onChange={this.handleChange()}
                      value={this.state.searchInput}
                    />

                    <br />
                    {width < 600 ?
                      <Row>
                        {this.state.filteredPools.map(function (item, index) {
                          return (
                            index < 6 &&
                            <Col lg={3} md={4} sm={4} xs={6}>
                              <Card>
                                <CardBody >
                                  <CardText>
                                    <Link to={`/pool/${item.pool_id}`}>
                                      <h6>
                                        <b>&nbsp;{item.ticker}</b>
                                      </h6>
                                    </Link>
                                  </CardText>
                                </CardBody>
                              </Card>
                            </Col>
                          )
                        })
                        }
                      </Row>
                      :
                      <Row>
                        {this.state.filteredPools.map(function (item, index) {

                          return (
                            index < 20 &&
                            <Col lg={3} md={4} sm={4} xs={4}>
                              <Card>
                                <CardBody>
                                  <CardText>
                                    <Link to={`/pool/${item.pool_id}`}>
                                      <h6>
                                        <b>&nbsp;{item.ticker}</b>
                                      </h6>
                                    </Link>
                                  </CardText>
                                </CardBody>
                              </Card>
                            </Col>
                          )
                        })
                        }
                      </Row>
                    }

                  </CardBody>
                </Card>
                <hr></hr>
                <Card>
                  <CardHeader><h6><b>Team Peek</b></h6><small>Support PoolPeek by staking with us.</small></CardHeader>
                  <CardBody body>
                    <Row>
                      {teamPeekData.map(
                        ({ id, image, title, description, poolid, imgWidth, imgHeight, right }) => (
                          //https://poolpeek.com/pool/be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6


                          <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                            <Link to={`/pool/${poolid}`}>
                              <h6>
                                <ReactImageFallback
                                  src={image}
                                  width="40"
                                  height="40"
                                  fallbackImage={null} />

                              </h6>
                              <Row style={{
                                alignContent: 'center', justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}><b>&nbsp;{title}</b></Row>
                              {/* <p>{item.description}</p> */}
                            </Link>
                          </Col>


                        ),
                      )}
                    </Row>
                  </CardBody>

                </Card>


              </Col>
              <Col lg={6} md={12} sm={12} xs={12} className="mb-3">
                <BlocksPage numberToSHow={20} />
              </Col>
              <Col lg={3} md={12} sm={12} xs={12} className="mb-3">

                {this.state.chainLoadData &&
                  <Card>
                    <CardHeader><h6><b>Chain Load</b></h6><small>Cardano chain load last 7 days. </small></CardHeader>
                    <CardBody body>
                      <LoadChart chainLoadData={this.state.chainLoadData} />
                    </CardBody>
                  </Card>}
                <hr></hr>
                {this.state.advertisingpool != null &&
                  <Card>
                    <CardHeader><h6><b>Pool Promo</b></h6></CardHeader>
                    <CardBody body >

                      <Row style={{
                        fontSize: 14, alignContent: 'center', justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        margin: "10px"
                      }}>
                        <Link to={`/pool/${this.state.advertisingpool.pool_id}`}>
                          <h6>

                            {checkIsImageUrl(this.state.advertisingpool.extended_meta.url_png_logo) ? (
                              <ReactImageFallback
                                src={this.state.advertisingpool.extended_meta.url_png_logo}
                                width="120"
                                height="70"
                                fallbackImage={CardanoImage} />
                            ) : (<img
                              src={CardanoImage}
                              className="pr-2"
                              width="60"
                              height="60"
                            />)}

                            <Row style={{
                              alignContent: 'center', justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}><h6><b>{ReactHtmlParser(this.state.advertisingpool.name)}({this.state.advertisingpool.ticker})</b></h6></Row>
                          </h6>
                          <p>{ReactHtmlParser(linkifyHtml(this.state.advertisingpool.description, {
                            defaultProtocol: 'https'
                          }))}</p>


                          <p><Button variant="outline-light" size="sm">More Info</Button></p>

                        </Link>
                        <br></br>
                      </Row>
                    </CardBody>
                  </Card>}

                <hr></hr>
                <Card>
                  <CardHeader><h6><b>PoolPeekCoin Pools</b></h6><small>Stake with one of the PoolPeekCoin Pools to earn PPC</small></CardHeader>
                  <CardBody body>
                    <Link to={`/poolpeekcoinpools`}>
                      <h6>
                        <p><Button variant="outline-light" size="sm">View Pools</Button></p>
                      </h6>
                      <video loop autoPlay muted style={{ width: "5vw" }}>
                        <source src={ppc} type='video/mp4' />
                      </video>
                    </Link>
                  </CardBody>
                </Card>
                {/* <Card>
                <CardHeader><h6><b>Pool Promo</b></h6><small>Pool Promo</small></CardHeader>
                <CardBody body >

                  {this.state.pools.map(function (item, index) {
                    if (index < 1) {
                      return (
                        <Row style={{
                          fontSize: 14, alignContent: 'center', justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          margin: "10px"
                        }}>
                          <Link to={`/pool/${item.pool_id}`}>
                            <h6>
                              {checkIsImageUrl(item.extended_meta.url_png_logo) ? (
                                <ReactImageFallback
                                  src={item.extended_meta.url_png_logo}
                                  width="70"
                                  height="70"
                                  fallbackImage={CardanoImage} />
                              ) : (<img
                                src={CardanoImage}
                                className="pr-2"
                                width="70"
                                height="70"
                              />)}

                              <Row style={{
                                alignContent: 'center', justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}><h7><b>{ReactHtmlParser(item.name)}({item.ticker})</b></h7></Row>
                            </h6>
                            <small>{ReactHtmlParser(linkifyHtml(item.description, {
                              defaultProtocol: 'https'
                            }))}</small>
                          </Link>
                          <br></br>
                        </Row>
                      )
                    }
                  })
                  }
                </CardBody>
              </Card> */}




                <br></br>

                {/* <Card>
                <CardHeader><h6><b>Random Pools</b></h6><small>A randomising pool list</small></CardHeader>
                <CardBody body >

                  {this.state.pools.map(function (item, index) {
                    if (index <= 2) {
                      return (
                        <Row style={{
                          fontSize: 14, alignContent: 'center', justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          margin: "10px"
                        }}>
                          <Link to={`/pool/${item.pool_id}`}>
                            <h6>

                              {checkIsImageUrl(item.extended_meta.url_png_logo) ? (
                                <ReactImageFallback
                                  src={item.extended_meta.url_png_logo}
                                  width="60"
                                  height="50"
                                  fallbackImage={CardanoImage} />
                              ) : (<img
                                src={CardanoImage}
                                className="pr-2"
                                width="60"
                                height="60"
                              />)}

                              <Row style={{
                                alignContent: 'center', justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}><h6><b>{ReactHtmlParser(item.name)}({item.ticker})</b></h6></Row>
                            </h6>
                            <small>{ReactHtmlParser(linkifyHtml(item.description, {
                              defaultProtocol: 'https'
                            }))}</small>
                          </Link>
                          <br></br>
                        </Row>

                      )
                    }
                  })
                  }
                </CardBody>
              </Card> */}


                <br></br>





                {/* <Card>
                <CardHeader><h6><b>Random Quality Pools</b></h6><small>A randomising list of pools we recommend!</small></CardHeader>
                <CardBody body style={{ minHeight: 350 }}>

                  {this.state.pools.map(function (item, index) {
                    if (index <= 2) {
                      return (
                        <Row style={{ display: 'inline-block' }}>
                          <Link to={`/pool/${item.pool_id}`}>
                            <h6>
                              {checkIsImageUrl(item.extended_meta.url_png_logo) ? (
                                <ReactImageFallback
                                  src={item.extended_meta.url_png_logo}
                                  width="40"
                                  height="40"
                                  fallbackImage={CardanoImage} />
                              ) : (<img
                                src={CardanoImage}
                                className="pr-2"
                                width="38"
                                height="32"
                              />)}
                              <b>&nbsp;{ReactHtmlParser(item.name)}</b>
                            </h6>

                            <p>{ReactHtmlParser(linkifyHtml(item.description, {
                              defaultProtocol: 'https'
                            }))}</p>
                          </Link>
                        </Row>
                      )
                    }
                  })
                  }
                </CardBody>
              </Card> */}
              </Col>

            </Row>
            <Row>

              {/* <Card>
                <CardHeader >
                  <p><h6><b>Pool Selection Wizard</b></h6></p><small>Use the below wizard to help you find a stake pool.</small>
                </CardHeader>
                <CardBody body >
                  <br></br>
                  <a href="https://pool-peek.web.app/#/wizard" target="_blank" rel="noreferrer"><p><Button variant="outline-light" size="sm">Pool Wizard</Button></p>                   <br></br></a>
                </CardBody>
              </Card> */}
              {/* <Card>
                <CardHeader><h6><b>PoolPeekCoin Pools</b></h6><small>Stake with one of the PoolPeekCoin Pools to earn PPC</small></CardHeader>
                <CardBody body>
                  <Link to={`/poolpeekcoinpools`}>
                    <h6>
                      <p><Button variant="outline-light" size="sm">View Pools</Button></p>
                    </h6>
                    <video loop autoPlay muted style={{ width: "12vw" }}>
                      <source src={ppc} type='video/mp4' />
                    </video>
                  </Link>
                </CardBody>
              </Card> */}

            </Row>
          </Row>
        }
      </Page >
    );
  }
}


const mapStateToProps = state => {
  return {
    wallet: state
  };
};

export default connect(mapStateToProps)(DashboardPage);