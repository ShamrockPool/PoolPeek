import Page from 'components/Page';
import React from 'react';
import {
  Col,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Row,
  Button,
  Input
} from 'reactstrap';

import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrlPoolPeekService, getRetiredPools, baseUrl, getPoolsRetiringAcrossEpoch } from '../assets/services';
import "../styles/styles.css";
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MyPoolRewardsChart from 'components/pool/MyPoolRewardsChart';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;


class MyWalletPage extends React.Component {
  state = {
    pools: null,
    loading: true,
    totalPools: '',
    smallScreen: false,
    searched: "",
    filterAblepools: [],
    retiredPools: [],
    retiredPoolsBkUp: [],
    totalPools: null,
    totalLiveStake: null,
    totalDelegates: null,
    stats: null,
    walletConnected: false,
    namiEnabled: false,
    retiringData: null
  };

  async componentDidMount() {

    if (width < 600) {
      this.setState({ smallScreen: true });
    }


    this.getRetiringData();


    window.scrollTo(0, 0);
  }

  async getRetiringData() {
    var response = await fetch(baseUrl + getPoolsRetiringAcrossEpoch);
    var data = await response.json();
    this.setState({ retiringData: data });
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

  handleChange = (query) => (e) => {
    var input = e.target.value;

    if (input == "") {
      this.setState({ retiredPools: this.state.retiredPoolsBkUp, searchInput: input });
    } else {
      var poolsToDisplay = this.state.retiredPools;
      poolsToDisplay = poolsToDisplay.filter(pool => pool.name.toLowerCase().includes(input.toLowerCase()) ||
        pool.ticker.toLowerCase().includes(input.toLowerCase()));
      this.setState({ retiredPools: poolsToDisplay, searchInput: input });
    }

  }




  render() {

    return (
      <Page
        className="MyWalletPage"
        title="View Your Wallet Contents"
      >
        {this.state.loading ? <div><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
          :
          <Row>
            <Col xl={12} lg={12} md={12} sm={12} >

              <Row style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <Col xl={8} lg={10} md={12} sm={12} >
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}><h1>SHA</h1></Row>
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}><h1>100000 ₳</h1></Row>
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>

                    <Col style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                        <small>TOKENS</small>
                      </Row>
                      <Row>

                      </Row>
                    </Col>

                    <Col>
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                        <small>UTXOs</small>
                      </Row>
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>

                      </Row>
                    </Col>

                    <Col>
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                        <small>REWARDS</small>
                      </Row>
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>

                      </Row>
                    </Col>
                  </Row>

                </Col>
              </Row>

            </Col>


            <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
              <Row>
                <Col lg={5} md={12} sm={12} xs={12} className="mb-3">
                  <Card>
                    <CardBody body>
                    <h6><b>Your Stake Pool</b></h6>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg={7} md={12} sm={12} xs={12} className="mb-3">
                  {width > 800 && this.state.retiringData &&
                    <MyPoolRewardsChart retiringData={this.state.retiringData.poolRetire} />
                  }
                </Col>
              </Row>
            </Col>

          </Row>
        }
      </Page>
    );
  }
}
export default MyWalletPage;
