import Page from 'components/Page';
import React from 'react';
import {
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Button,
  Input
} from 'reactstrap';

import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrlPoolPeekService, getRetiredPools } from '../assets/services';
import "../styles/styles.css";
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';


const cardano = window.cardano;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});

const tableRowStyle = {
  // borderBottom: 'solid 3px blue',
  // background: 'green',
  // color: 'white',
  fontWeight: 'bold',
  // padding: 0,
};

const columns = [
  {
    field: 'name', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Name'}
      </h2>
    )
  },
  {
    field: 'ticker', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Ticker'}
      </h2>
    ),
  },
  {
    field: 'livestake', flex: 1,
    renderHeader: (params) => (
      <h2>
        {'Stake'}
      </h2>
    ),
  },
  {
    field: 'saturation', flex: 1, renderHeader: (params) => (
      <h2>
        {'Saturation'}
      </h2>
    ),
  },
];

class RetiredPoolsV2 extends React.Component {
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
  };

  async componentDidMount() {

    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    try {
      var namiEnabled = await cardano.enable();
      this.setState({ namiEnabled: namiEnabled });
    } catch (error) {

    }

    this.getRetiredPools();



    window.scrollTo(0, 0);
  }


  async getRetiredPools() {
    try {
      var response = await fetch(baseUrlPoolPeekService + getRetiredPools);
      const data = await response.json();
      this.setState({ loading: false, retiredPools: data.pools, retiredPoolsBkUp: data.pools, 
        totalPools: data.poolsCount, totalLiveStake: data.totalLiveStake, totalDelegates: data.totalDelegates });

    } catch (error) {
      console.log(error)
    }
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

  handleChange = (query) => (e) => {
    var input = e.target.value;

    if(input == ""){
      this.setState({ retiredPools: this.state.retiredPoolsBkUp, searchInput: input });
    }else{
      var poolsToDisplay = this.state.retiredPools;
      poolsToDisplay = poolsToDisplay.filter(pool => pool.name.toLowerCase().includes(input.toLowerCase()) ||
        pool.ticker.toLowerCase().includes(input.toLowerCase()));
      this.setState({ retiredPools: poolsToDisplay, searchInput: input });
    }

  }




  render() {

    return (
      <Page
        className="RetiredPools"
        title="Retired Pools With Stake"
      >
        {this.state.loading ? <div><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
          :


          <Col style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>

            <Row>
              <Col lg={12} md={12} sm={12} xs={12} className="mb-3" style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <Row style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <Col lg={3} md={6} sm={12} xs={12} className="mb-3" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Pools Count
                        </CardTitle>
                        <CardText>
                          {this.state.totalPools}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={3} md={6} sm={12} xs={12} className="mb-3" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Total Live Stake
                        </CardTitle>
                        <CardText>
                          {this.addCommas(this.state.totalLiveStake)}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={3} md={6} sm={12} xs={12} className="mb-3" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Wallets Staked
                        </CardTitle>
                        <CardText>
                          {this.state.totalDelegates}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

              </Col>

            </Row>
            <Row style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>

              <h4 style={{ color: 'red' }}>Retired pools move your ADA to another pool if with one of the below.</h4>
            </Row>
            <Row style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <Col lg={3} md={6} sm={12} xs={12} className="mb-3" style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>

                <Input
                  style={{
                    fontSize: 20, alignContent: 'center', justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                  type="text"
                  className="cr-search-form__input"
                  placeholder="Search with Ticker or Pool Name"
                  onChange={this.handleChange()}
                  value={this.state.searchInput}
                />

              </Col>
            </Row>

            <Row style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <Col lg={12} md={12} sm={12} xs={12} className="mb-3" style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>

                <div style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>


                  <Card style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    display: 'flex',
                  }}>

                    <CardBody body style={{
                      padding: '0px', margin: '0px', justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>

                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        display: 'flex',
                      }}>


                        {this.state.retiredPools.map((item) => (
                          <Card style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            display: 'flex',
                            padding: '10px',
                            margin: '10px'
                          }}>

                            <CardBody body style={{
                              padding: '5px', margin: '0px', justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}>
                              <CardTitle className="text-capitalize" style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                              }}>
                                {item.name}
                              </CardTitle>

                              <h6>{item.ticker}</h6>
                              <br></br>
                              <h6 style={{ color: 'red' }}>Live Stake: {this.addCommas(item.live_stake)}₳</h6>
                              <br></br>
                              <Link to={`/pool/${item.pool_id}`} target="_blank" rel="noopener noreferrer">
                                <p><Button size="sm" style={{ color: '#040404', backgroundColor: "#040404" }}>View</Button></p>
                              </Link>


                            </CardBody>
                          </Card>
                        ))}
                      </Row>


                    </CardBody>
                  </Card>
                </div>
              </Col>


            </Row>
          </Col>



        }
      </Page>
    );
  }
}
export default RetiredPoolsV2;
