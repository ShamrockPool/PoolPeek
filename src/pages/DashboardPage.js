import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import { IconWidget, NumberWidget } from 'components/Widget';
import {
  teamPeekData,
} from 'demos/dashboardPage';
import React from 'react';
import {
  FaTwitter,
  FaTelegram,
  FaMobile,
  FaMobileAlt,
  FaTelegramPlane
} from 'react-icons/fa';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  CardText
} from 'reactstrap';
import { getColor } from 'utils/colors';
import googleAppStore from 'assets/img/google_plays.png';
import appAppStore from 'assets/img/apple_store.png';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { isEmpty } from 'utils/stringutil.js';
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactHtmlParser from 'react-html-parser';
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
  borderBottom: 'solid 1px green',
  borderTop: 'solid 1px green',
  borderRight: 'solid 1px green',
  borderLeft: 'solid 1px green',
  // background: 'green',
  // color: 'white',
  paddingBottom: 0
};

const cardBodyStyle = {
  borderBottom: 'solid 1px green',
  // borderTop: 'solid 1px green',
  borderRight: 'solid 1px green',
  borderLeft: 'solid 1px green',
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
    percentageOfSupplyStaked: 0
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

  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);

    if (width < 600) {
      this.setState({ modal: true, modalImageWidth: width / 1.2 });
    }

    this.teamPeekData = shuffle(teamPeekData);
    this.getPoolList();
    this.getDashboardData();



  }

  async getPoolList() {
    var response = await fetch("https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&sid=1614342231163&blockfrom=1&blockto=100&activestakefrom=250000&activestaketo=8000000&excluderetired=1&exclude_splitters=1&has_twitter=1");
    const data = await response.json();
    console.log(data);
    this.state.pools = data.poolpeek.pools;
    this.setState({ pools: data.poolpeek.pools, loading: false });
  }

  async getDashboardData() {
    var response = await fetch("https://smashpeek.com/services/dashboard/data");
    const data = await response.json();
    console.log(data);

    this.setState({ liveStake: data.liveStake, totalWalletsStaked: data.totalWalletsStaked, totalAdaSupply: data.totalAdaSupply });
    this.state.liveStake = data.liveStake;
    this.state.totalAdaSupply =  data.totalAdaSupply;

    var adaSupply = parseFloat(data.liveStake.replace(/,/g, ''));
    var liveStake = parseFloat(data.totalAdaSupply.replace(/,/g, ''));
    var percentage = ((adaSupply / liveStake) * 100).toFixed(2)
    this.setState({
      percentageOfSupplyStaked: percentage
    });
  }

  render() {
    return (
      <Page
        className="DashboardPage"
      // title="Dashboard"
      // breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={2} sm={2} xs={12} className="mb-3">
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

          <Col lg={3} md={2} sm={2} xs={12} className="mb-3">
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

          <Col lg={3} md={2} sm={2} xs={12} className="mb-3">
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

          <Col lg={3} md={2} sm={2} xs={12} className="mb-3">
            <Card inverse color='primary'>
              <CardBody>
                <CardTitle className="text-capitalize">
                  {this.state.percentageOfSupplyStaked}
                </CardTitle>
                <CardText>
                  % Of ADA Supply Staked
                </CardText>
              </CardBody>
            </Card>
          </Col>

        </Row>

        <Row>
          <Col >
            <a href="https://twitter.com/CardanoPoolPeek" target="_blank" rel="noreferrer">
              <IconWidget
                bgColor="white"
                inverse={false}
                icon={FaTwitter}
                title="Follow Our Twitter"
                subtitle=""
              />
            </a>
          </Col>

          <Col >
            <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaMobileAlt}
              title="Download Mobile APP"
              subtitle=""
              onClick={this.toggle()}
            />
          </Col>

          <Col >
            <a href="https://t.me/poolpeek" target="_blank" rel="noreferrer"> <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaTelegram}
              title="Join Our Telegram"
              subtitle=""
            /></a>
          </Col>

          <Col >
            <a href="http://t.me/poolpeek_bot" target="_blank" rel="noreferrer"> <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaTelegramPlane}
              title="Staking Rewards Bot"
              subtitle="Register Your Stake Address"
            /></a>
          </Col>
        </Row>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle()}
        // className={this.props.className}
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

        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader style={cardheaderStyle}><p><b>Team Peek</b> - Support PoolPeek by staking with us!</p></CardHeader>
              <CardBody style={cardBodyStyle} body>
                {teamPeekData.map(
                  ({ id, image, title, description, poolid, right }) => (
                    //https://poolpeek.com/pool/be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6

                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      poolid={poolid}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader style={cardheaderStyle}><p><b>Recommended Pools</b></p></CardHeader>
              <CardBody style={cardBodyStyle} body>
                {this.state.loading ? <div>Loading pools...<CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
                  :
                  this.state.pools.map(function (item, index) {
                    if (index <= 3) {
                      return (
                        <div style={{ display: 'inline-block' }}>
                          <a href={`https://poolpeek.com/pool/${item.pool_id}`} target="_blank" rel="noreferrer">
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
                          </a>
                        </div>
                      )
                    }
                  })
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;