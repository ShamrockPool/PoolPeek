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
import { baseUrlPoolPeekService, getSaturatedPools, getPoolsAtRiskOfSaturation } from '../assets/services';
import "../styles/styles.css";

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

import JoinPool from 'components/wallet/JoinPool';

const cardano = window.cardano;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;



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

class SaturatedPools extends React.Component {
  state = {
    pools: null,
    loading: true,
    totalPools: '',
    smallScreen: false,
    searched: "",
    poolsSaturated: [],
    poolsAtRiskOfSaturation: [],
    stats: null,
    walletConnected: false,
    namiEnabled: false,
  };

  async componentDidMount() {

    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    // try {
    //   var namiEnabled = await cardano.enable();
    //   this.setState({ namiEnabled: namiEnabled });
    // } catch (error) {

    // }

    this.getPoolsAtRiskOfSaturation();



    window.scrollTo(0, 0);
  }

  async getPoolsAtRiskOfSaturation() {
    try {
      var response = await fetch(baseUrlPoolPeekService + getPoolsAtRiskOfSaturation);
      const riskOfSatData = await response.json();

      var response2 = await fetch(baseUrlPoolPeekService + getSaturatedPools);
      const satData = await response2.json();

      this.setState({ poolsSaturated: satData.pools, poolsAtRiskOfSaturation: riskOfSatData.pools, loading: false  })
    } catch (error) {
      console.log(error)
    }

    try {

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
        className="SundaeISOPools"
        title="Saturated Pools"
      >
        {this.state.loading ? <div><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
          :


          <Col>
            <h5>Saturation is used to indicate that a stake pool has more stake than is ideal for the network.</h5>
            <h5>Once a pool reaches the point of saturation, it will offer diminishing rewards.</h5>
            <Row>


              <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                <Card>

                  <CardBody body style={{
                    padding: '5px', margin: '0px',
                  }}>
                    <CardTitle className="text-capitalize">
                      <b>Saturated Pools</b>
                    </CardTitle>

                    {this.state.smallScreen == false ?
                      <Table {...{ ['striped']: true }}>
                        <thead>
                          <tr>
                            <th onClick={e => this.onSort(e, 'name')}>Name</th>
                            <th onClick={e => this.onSort(e, 'ticker')}>Ticker</th>
                            <th onClick={e => this.onSort(e, 'margin_pct')}>Margin</th>
                            {/* <th onClick={e => this.onSort(e, 'cost_per_epoch')}>Fixed Cost</th> */}
                            <th onClick={e => this.onSort(e, 'live_stake_delegator_count')}>Delegates</th>
                            <th onClick={e => this.onSort(e, 'live_stake')}>Live Stake</th>
                            <th onClick={e => this.onSort(e, 'pct_saturated')}>Filled</th>
                            <th></th>

                          </tr>
                        </thead>

                        {this.state.poolsSaturated.map((item) => (
                          <tbody>

                            <tr>
                              <td style={tableRowStyle} scope="row" ><p>{item.name}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{item.margin_pct}%</p></td>
                              {/* <td style={tableRowStyle} scope="row"><p>{item.cost_per_epoch}₳</p></td> */}
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake_delegator_count)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{Number(item.pct_saturated).toFixed(2)}%</p></td>

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
                            {/* <th onClick={e => this.onSort(e, 'ticker')}>Ticker</th> */}
                            <th onClick={e => this.onSort(e, 'live_stake')}>Stake</th>
                            <th onClick={e => this.onSort(e, 'pct_saturated')}>Filled</th>

                          </tr>
                        </thead>

                        {this.state.poolsSaturated.map((item) => (
                          <tbody>
                            <tr onClick={() => this.handleRowClick(item)}>
                              <td style={tableRowStyle} scope="row" ><p>{item.name}<br />({item.ticker})</p></td>
                              {/* <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td> */}
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{Number(item.pct_saturated).toFixed(2)}%</p></td>
                            </tr>
                          </tbody>

                        ))}

                      </Table>
                    }
                  </CardBody>
                </Card>

                <br></br>

                <Card>

                  <CardBody body style={{
                    padding: '5px', margin: '0px',
                  }}>
                    <CardTitle className="text-capitalize">
                      <b>Risk of Saturation</b>
                    </CardTitle>

                    {this.state.smallScreen == false ?
                      <Table {...{ ['striped']: true }}>
                        <thead>
                          <tr>
                            <th onClick={e => this.onSort(e, 'name')}>Name</th>
                            <th onClick={e => this.onSort(e, 'ticker')}>Ticker</th>
                            <th onClick={e => this.onSort(e, 'margin_pct')}>Margin</th>
                            {/* <th onClick={e => this.onSort(e, 'cost_per_epoch')}>Fixed Cost</th> */}
                            <th onClick={e => this.onSort(e, 'live_stake_delegator_count')}>Delegates</th>
                            <th onClick={e => this.onSort(e, 'live_stake')}>Live Stake</th>
                            <th onClick={e => this.onSort(e, 'pct_saturated')}>Filled</th>
                            <th></th>

                          </tr>
                        </thead>

                        {this.state.poolsAtRiskOfSaturation.map((item) => (
                          item.pct_saturated < 100 &&
                          <tbody>

                            <tr>
                              <td style={tableRowStyle} scope="row" ><p>{item.name}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{item.margin_pct}%</p></td>
                              {/* <td style={tableRowStyle} scope="row"><p>{item.cost_per_epoch}₳</p></td> */}
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake_delegator_count)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{Number(item.pct_saturated).toFixed(2)}%</p></td>

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
                            {/* <th onClick={e => this.onSort(e, 'ticker')}>Ticker</th> */}
                            <th onClick={e => this.onSort(e, 'live_stake')}>Stake</th>
                            <th onClick={e => this.onSort(e, 'pct_saturated')}>Filled</th>

                          </tr>
                        </thead>

                        {this.state.poolsAtRiskOfSaturation.map((item) => (
                          <tbody>
                            <tr onClick={() => this.handleRowClick(item)}>
                              <td style={tableRowStyle} scope="row" ><p>{item.name}<br />({item.ticker})</p></td>
                              {/* <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td> */}
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{Number(item.pct_saturated).toFixed(2)}%</p></td>
                            </tr>
                          </tbody>

                        ))}

                      </Table>
                    }
                  </CardBody>
                </Card>
              </Col>


            </Row>
          </Col>



        }
      </Page>
    );
  }
}
export default SaturatedPools;
