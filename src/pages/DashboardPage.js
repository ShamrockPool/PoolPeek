import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
import {
  teamPeekData,
} from 'demos/dashboardPage';
import Timer from "react-compound-timer";
import React from 'react';
import {
  FaTwitter,
  FaTelegram,
  FaMobile,
  FaMobileAlt
} from 'react-icons/fa';
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
import { baseUrl, baseUrlPoolPeekService, dashboardData, recommendedPools, getPoolForRecommendedList, getPoolForSearchList } from '../assets/services';
import Favorite from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

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
    pools: null,
    liveStake: '',
    totalWalletsStaked: '',
    totalAdaSupply: '',
    modalImageWidth: 450,
    percentageOfSupplyStaked: 0,
    allpools: null,
    filteredPools: null,
    favouritepools: [],
    epochSecondsRemaining: 0,
    searchInput: null
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

  async componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);

   

    this.getFavouritePools();
    this.generateEpochEvents();

    if (width < 600) {
      this.setState({ modal: false, modalImageWidth: width / 1.2 });
    }

    this.teamPeekData = teamPeekData;//shuffle(teamPeekData);

    await this.getDashboardData();

    
    var namiEnabled = await cardano.enable();
  }

  async getDashboardData() {
    this.getDashboardStatsData();
    await this.getAllPools();
    await this.getPoolList();
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

  async getPoolList() {
    var response = await fetch(baseUrlPoolPeekService + getPoolForRecommendedList);
    var data = await response.json();
    //console.log(data);
    this.setState({ pools: data.pools });
  }

  async getDashboardStatsData() {
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
  }


  isLoading() {
    if (this.state.loading || this.state.allpools == null || this.state.pools == null) {
      return true;
    }
    else {
      return false;
    }
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
    poolsToDisplay = poolsToDisplay.filter(pool => pool.name.toLowerCase().includes(input.toLowerCase()) ||
      pool.ticker.toLowerCase().includes(input.toLowerCase()));
    this.setState({ filteredPools: poolsToDisplay, searchInput: input });
  }

  render() {
    return (
      <Page
        className="DashboardPage"
      // title="Dashboard"
      // breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>

          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='primary'>
              <CardBody>
                <CardTitle className="text-capitalize">
                  {this.state.totalPools}
                </CardTitle>
                <CardText>
                  Stake Pools
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
            <Card inverse color='secondary'>
              <CardBody>
                <CardTitle className="text-capitalize">
                  {this.state.totalAdaSupply}
                </CardTitle>
                <CardText>
                  ADA Supply
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
                  Staked Wallets
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
                  ADA Staked
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
                  % Of ADA Staked
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col lg={2} md={6} sm={6} xs={6} className="mb-3">
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
          </Col>

        </Row>

        <Row>
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
        </Row>

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

            <Col lg={4} md={12} sm={12} xs={12} className="mb-3">

              <Card>
                <CardHeader >
                  <p><h6><b>Pool Search</b></h6></p>
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
                              <CardBody>
                                <Link to={`/pool/${item.pool_id}`}>
                                  <h6>
                                    <b>&nbsp;{item.ticker}</b>
                                  </h6>
                                </Link>
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
                          index < 12 &&
                          <Col lg={3} md={4} sm={4} xs={4}>
                            <Card>
                              <CardBody>
                                <Link to={`/pool/${item.pool_id}`}>
                                  <h6>
                                    <b>&nbsp;{item.ticker}</b>
                                  </h6>
                                </Link>
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
            </Col>
            <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
              {/* <PoolSearchWizard />
               */}

              <Timer
                initialTime={this.state.epochSecondsRemaining}
                direction="backward"
              >
                <Card>
                  <CardHeader><h6><b>Next Cardano Epoch starts in:</b></h6></CardHeader>
                  <CardBody body>
                    <div className="container-fluid" style={{ width: "100%" }}>

                      {/* <h6><b>Next Cardano Epoch starts in:</b></h6> */}
                      <Table {...{ ['striped']: true }}>
                        <thead>
                          <tr>
                            <th>Days</th>
                            <th>Hours</th>
                            <th>Minutes</th>
                            <th>Seconds</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><Timer.Days /></td>
                            <td><Timer.Hours /></td>
                            <td><Timer.Minutes /></td>
                            <td><Timer.Seconds /></td>
                          </tr>
                        </tbody>
                      </Table>

                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader><h6><b>Team Peek</b></h6><small>Support PoolPeek by staking with us.</small></CardHeader>
                  <CardBody body>

                    {teamPeekData.map(
                      ({ id, image, title, description, poolid, imgWidth, imgHeight, right }) => (
                        //https://poolpeek.com/pool/be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6

                        <div style={{ display: 'inline-block', paddingRight: '10px' }}>
                          <Link to={`/pool/${poolid}`}>
                            <h6>
                              <ReactImageFallback
                                src={image}
                                width={imgWidth}
                                height={imgHeight}
                                fallbackImage={null} />
                              <b>&nbsp;{title}</b>
                            </h6>
                            {/* <p>{item.description}</p> */}
                          </Link>
                        </div>

                      ),
                    )}

                  </CardBody>
                </Card>
              </Timer>
            </Col>
            <Col lg={4} md={12} sm={12} xs={12} className="mb-3">

              <Card>
                <CardHeader >
                  <p><h6><b>Pool Selection Wizard</b></h6></p><small>Use the below wizard to help you find your pool.</small>


                </CardHeader>
                <CardBody body >
                  <a href="https://pool-peek.web.app/#/wizard" target="_blank" rel="noreferrer"> <IconWidget
                    bgColor="white"
                    inverse={false}
                    // icon={FaWizardsOfTheCoast}
                    title="Pool Wizard"
                    subtitle=""
                  /></a>
                </CardBody>
              </Card>

              <Card>
                <CardHeader >
                  <p><h6><b>Favourite Pools</b></h6></p><small>Click the favourite icon  on pools.</small>
                  <Favorite style={{ color: red }}></Favorite>
                </CardHeader>
                <CardBody body >
                  <Row>
                    <Col>
                      {this.state.favouritepools.map(function (item, index) {

                        return (
                          <div style={{ display: 'inline-block', paddingRight: '5px' }}>
                            <Link to={`/pool/${item.pool_id}`}>
                              <h6>
                                {checkIsImageUrl(item.url_png_logo) ? (
                                  <ReactImageFallback
                                    src={item.url_png_logo}
                                    width="60"
                                    height="60"
                                    fallbackImage={CardanoImage} />
                                ) : (<img
                                  src={CardanoImage}
                                  className="pr-2"
                                  width="38"
                                  height="32"
                                />)}
                                <b>&nbsp;{item.name}</b>
                              </h6>

                              {/* <p>{item.description}</p> */}
                            </Link>
                          </div>
                        )

                      })
                      }
                    </Col>
                  </Row>
                </CardBody>
              </Card>

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
        }
      </Page >
    );
  }
}
export default DashboardPage;