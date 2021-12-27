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

class RetiredPools extends React.Component {
  state = {
    pools: null,
    loading: true,
    totalPools: '',
    smallScreen: false,
    searched: "",
    filterAblepools: [],
    retiredPools: [],
    totalPools: null,
    totalLiveStake: null,
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
      this.setState({ loading: false, retiredPools: data.pools, totalPools: data.poolsCount, totalLiveStake: data.totalLiveStake });

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

  onSort(event, sortKey) {
    if (sortKey == 'name' || sortKey == 'ticker') {
      const data = this.state.filterAblePools;
      data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
      this.setState({ loading: false, filterAblePools: data })
    } else {
      const data = this.state.filterAblePools;
      data.sort((a, b) => Number(a[sortKey]) - (Number(b[sortKey])))
      this.setState({ loading: false, filterAblePools: data })
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
            <h5>This list of pools are all retired and have more than 1000 ADA staked!</h5>
            <h5>We would encourage anyone staking with the below pools to move their stake.</h5>
            <br></br>

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
                </Row>
              </Col>

            </Row>

            <Row style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>


              <Col lg={9} md={12} sm={12} xs={12} className="mb-3" style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>

                <br></br>
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
                      padding: '5px', margin: '0px', justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}>
                      <CardTitle className="text-capitalize" style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                        <b>Pools</b>
                      </CardTitle>

                      {this.state.smallScreen == false ?
                        <Table {...{ ['striped']: true }} style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}>
                          <thead style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}>
                            <tr style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}>
                              <th onClick={e => this.onSort(e, 'name')}>Name</th>
                              <th onClick={e => this.onSort(e, 'ticker')}>Ticker</th>
                              <th onClick={e => this.onSort(e, 'live_stake_delegator_count')}>Delegates</th>
                              <th onClick={e => this.onSort(e, 'live_stake')}>Live Stake</th>
                              <th></th>
                            </tr>
                          </thead>

                          {this.state.retiredPools.map((item) => (
                            <tbody style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}>

                              <tr>
                                <td style={tableRowStyle} scope="row" ><p>{item.name}</p></td>
                                <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td>
                                <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake_delegator_count)}</p></td>
                                <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>

                                <Row><Link to={`/pool/${item.pool_id}`} target="_blank" rel="noopener noreferrer">
                                  <p><Button variant="outline-light" size="sm">View</Button></p>
                                </Link>
                                </Row>
                              </tr>

                            </tbody>

                          ))}

                        </Table>

                        :
                        <Table {...{ ['striped']: true }}>
                          <thead>
                            <tr>
                              <th onClick={e => this.onSort(e, 'name')}>Name</th>
                              <th onClick={e => this.onSort(e, 'live_stake')}>Stake</th>
                            </tr>
                          </thead>

                          {this.state.retiredPools.map((item) => (
                            <tbody>
                              <tr onClick={() => this.handleRowClick(item)}>
                                <td style={tableRowStyle} scope="row" ><p>{item.name}<br />({item.ticker})</p></td>
                                <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                              </tr>
                            </tbody>

                          ))}

                        </Table>
                      }
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
export default RetiredPools;
