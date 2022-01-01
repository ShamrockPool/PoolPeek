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
import { baseUrlPoolPeekService, getSundaeInfo } from '../assets/services';
import "../styles/styles.css";
import { isEmpty } from 'utils/stringutil.js';
// import SearchBar from "material-ui-search-bar";
// import { DataGrid } from '@material-ui/data-grid';
// import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

import Tooltip from "@material-ui/core/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram, faYoutube, faFacebook, faDiscord, faGithub, faReddit, faGitlab } from "@fortawesome/free-brands-svg-icons";

import JoinPool from 'components/nami/JoinPool';

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

const rows = [
  { id: 1, name: 2, ticker: 'item.ticker', livestake: 'item.live_stake', saturation: 1 },
  { id: 2, name: 3, ticker: 'item.ticker', livestake: 'item.live_stake', saturation: 1 },

];

const cardano = window.cardano;

class SundaePools extends React.Component {
  state = {
    pools: null,
    loading: true,
    totalPools: '',
    smallScreen: false,
    searched: "",
    filterAblepools: [],
    stats: null,
    namiEnabled: false,
  };

  async componentDidMount() {

    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    this.getSundaePools();
    window.scrollTo(0, 0);

    try {
      var namiEnabled = await cardano.isEnabled();
      this.setState({ namiEnabled: namiEnabled });
    } catch (error) {

    }

  }

  async getSundaePools() {
    try {
      var response = await fetch(baseUrlPoolPeekService + getSundaeInfo);
      const data = await response.json();

      this.setState({ stats: data.poolDetailsSundaeStatsVO })
      this.createRows(data);
      //this.setState({ loading: false, filterAblePools: rows })
    } catch (error) {
      console.log(error)
    }
  }

  createRows(sundaeData) {
    var rows = [];

    var poolsList = [];
    poolsList = sundaeData.pools;
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
        title="SundaeSwap ISO Pools"
      >
        {this.state.loading ? <div><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
          :


          <Col>

            <Row>
              <Col>
                <Row>
                  <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary' style={{ margin: '0px' }}>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Active SPO's
                        </CardTitle>
                        <CardText>
                          30
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Waiting SPO's
                        </CardTitle>
                        <CardText>
                          10
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          ISO Start Date
                        </CardTitle>
                        <CardText>
                          Not released
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={3} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          ISO End Date
                        </CardTitle>
                        <CardText>
                          Not released
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                </Row>

                <Row>
                  <h3>End of Vote Stats</h3>
                </Row>


                <Row>

                  <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Pools
                        </CardTitle>
                        <CardText>
                          74
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Stake
                        </CardTitle>
                        <CardText>
                          {this.addCommas(Number(1.8646080739E9))}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Delegates
                        </CardTitle>
                        <CardText>
                          {this.addCommas(120131)}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                {/* <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Total Saturated
                        </CardTitle>
                        <CardText>
                          5
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col> */}


                {/* 5 are saturated after vote */}

                <Row>
                  <h3>Live Stats</h3>
                </Row>


                <Row>

                  <Col lg={4} md={12} sm={12} xs={12} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Pools
                        </CardTitle>
                        <CardText>
                          {this.state.stats.total_pools}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Stake
                        </CardTitle>
                        <CardText>
                          {this.addCommas(this.state.stats.total_live_stake)}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Delegates
                        </CardTitle>
                        <CardText>
                          {this.addCommas(this.state.stats.live_stake_delegator_count)}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

              </Col>
            </Row>

            <Row>

              <Col style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <a href='https://discord.gg/6nZh34ZBkH' target="_blank" rel="noreferrer" >
                  <p>SundaeSwap Discord</p> <FontAwesomeIcon size="2x" icon={faDiscord} /> </a>
              </Col>

              <Col lg={12} md={12} sm={12} xs={12} className="mb-3">


                <Card>

                  <CardBody body style={{
                    padding: '5px', margin: '0px',
                  }}>
                    <CardTitle className="text-capitalize">
                      <b>Single Pool Operator Pools</b>
                    </CardTitle>
                    <small>Table ordered by filled %.</small>

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

                        {this.state.filterAblePools.map((item) => (

                          item.pool_splitter == 'N' &&
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
                                <JoinPool pool={item} namiEnabled={this.state.namiEnabled} />
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

                        {this.state.filterAblePools.map((item) => (
                          item.pool_splitter == 'N' &&
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

            <Row>

              <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                <Card>
                  <CardBody>
                    <CardTitle className="text-capitalize">
                      <b>Multiple Pool Operator Pools</b>
                    </CardTitle>


                    <small>Table ordered by saturation.</small>

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

                        {this.state.filterAblePools.map((item) => (
                          item.pool_splitter == 'Y' &&
                          <tbody>

                            <tr>
                              <td style={tableRowStyle} scope="row" ><p>{item.name}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{item.margin_pct}%</p></td>
                              {/* <td style={tableRowStyle} scope="row"><p>{item.cost_per_epoch}₳</p></td> */}
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake_delegator_count)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                              <td style={tableRowStyle} scope="row"><p>{item.pct_saturated}%</p></td>
                              <td style={tableRowStyle} scope="row">
                                <Row><Link to={`/pool/${item.pool_id}`} target="_blank" rel="noopener noreferrer">
                                  <p><Button variant="outline-light" size="sm">View</Button></p>
                                </Link>
                                  <JoinPool pool={item} namiEnabled={this.state.namiEnabled} /></Row>
                              </td>
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

                        {this.state.filterAblePools.map((item) => (
                          item.pool_splitter == 'Y' &&
                          <tbody>

                            <tr onClick={() => this.handleRowClick(item)}>
                              <td style={tableRowStyle} scope="row" ><p>{item.name}<br />({item.ticker})</p></td>
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
export default SundaePools;
