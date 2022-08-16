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
import { baseUrlPoolPeekService, getisopoolsPost } from '../../assets/services';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import Timer from "react-compound-timer";
import JoinPool from 'components/wallet/JoinPool';
import { FormControlLabel, Switch } from '@material-ui/core';

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

const isoPools = {
  isoName: 'ArdanaIsoPoolList',
  pool_idsArr: ['38927599cc3ff6b081501e0ee1dc4f0cb8ba012b3de8b49a785bb05a',
  '0019cb5ac91c786a809f4d87622a29d2c7f57f4697f8c8e8457f4de4',
  '39fca98bb733eea4fa54384c39d072cd9733cfa70d7bb63ce651a470',
  '79c4d4fe108f480fee98f307adac12571df2959651f833b595141cd1',
  'a50d1fd3cda9b9452cb149474a601d24332a870a6fe32b60add3a98b',
  'a71b4baef95a4daeb211e7f6f71d0e477d40d354104371f092fd6de8',
  '1e4f8dc9672d16131da6533287e32ea100b34d67543ff7c7358c7b5e',
  '96d4a78a1459a66cea6b396fd92f7abba092bd59535d21ad3c0463c7',
  '8d15d079a00f1818824797087507bd08529e9c07ace18de19375fbff',
  '9dcb2a0398835a6b0a71dd5bbaa0d6bb961276aedd72f2655c7879d0',
  'f3efb842c77895dde51e95e54d9c309da599631ef31216bcfea11083',
  '40c5a505a4276c94e49b848c1b0aa62c4ea244574f4e2e28ebb29210',
  'ab30718787e719f54a703a220ffffb3d794b2769b0e96795824cbe43',
  'd248ded3c18e0e80d07a46f00a2d808075b989ccb1a0e40a76e5cee1',
  '075a870caa0a0cf20a3c2cf514be05e2064ef1ba71b2381e8f16a09e',
  '4f345190f6280c907325bcd11f9b00f222f092c889f6bedfb739abb1',
  '19c56be8538786b0b1ddaeb4049faf6a00df0ca2df15e05b0472a866',
  '455778840915ea2ec843bfee7269c1e0963b08ce5d1cdf029e39cb59',
  '76e80e1b3f622c7051f222453497b0667e12892f5d94ee565d17dc52',
  '0a423fa44f23b13cba59474427d11746136672af66b2d80b4499dd1d',
  'c0d70a23601c6a880e7a730774c0a4005e49f0eb52ea38d1e609df0d',
  '351a90a0253fb3595ccc460438b9947cd8a0b9a7f457f3478bbb31d8',
  '079c374160b0ae34a5a20b8e95a5b5c8766239b2984f13d7ab962791',
  '95954fa839905a201d8d97cc31be8bbd4ac2ad0df1d201accce3a23e',
  '5790d62ab1ba703e861fe800f9cefaaf1485c3ca42c6ba9ce74690a1',
  '72de14d78a359617a7dd0b33c5554ed4edbafd768ece87c4bf672ee0',
  '7e3a1ed8f2085923debacc6866aefaba941edd638ff0886061ebf521',
  '4aea697c45e39e37e5d842ec8cf6c01a714e88db33a1ba0565ab59af',
  'f66a36de855d53b9d5110bd46640f48dbab1c848c9e2f5c36d8c12dc',
  '297b5acd8b90df8a1bfd98aa1a61f323b87fead4b8a2b55f2fb83ce6',
  '0e3f803915a37af7b6a121409192363e9de658524276c20c26f511ee',
  'e3f8a83cefed03fe4ebdc4f50f3cdd880a7c2fd0b2ce7ff9da9cdce2',
  '4dbdfb68de96a563719f7df2b3cf7c98fb547a3e7edca2a547d35852',
  'd28e4ae3848720195f09becd15e6985b54cbf3b62e52bf53c5af8501',
  '6f9ecffc4bc41068db87bd193e5842577df08a464cb7c001865c8b60',
  '138031b823a08dec4535e583ca8ea91530abd9c62b1c0b768fd1f834',
  '80cb48c2953a78d25f69dbcea305fbcce0c520c25d401cd75a259cf1',
  'fd2a060be85493dfdb03eecb6343a76636823d223d680a202b900f65',
  'c3cd2527a5f0b82a86ff69fdd5a3440dc51bcb957953ba19137738c0',
  '059b4217a24a8c67a363968ff1db13a17ed96e611362450c115b2415',
  '111646b0848804b1c0ff51888432c9c4b0b0aa3b55f11ecbd0e36624',
  '91991d9238f3f270a46fc237acc3abcdf2456ff163c1639951d75d15',
  '9837e1eca79504f57acd4e12f2db93ee04a76bca308cae61a6ee205a',
  '6c518b4861bb88b1395ceb116342cecbcfb8736282655f9a61c4c368',
  'c9bc139d73045ba6c5b002ff88ea2a5854b3e783c468adb9250df917',
  '9138b6f09e8e69c29fdee4e11b147b7ad351aab23fc73a9976907f10',
  'cb87bf12be816ecd5cd6e167442670e4024d85e0005c8623651b371f',
  '4d470d31f80c01d797996b43abdfe7339ae5b408fb31cc655a80ccd7',
  '5707e4254180d481a4f1e690be0c2c54b3a618051d907df7e4434c0b',
  '70ab9e73071c50927631a218137d53e765665a578b744feeae3c5d81',
  '6658713e2cbfa4e347691a0435953f5acbe9f03d330e94caa3a0cfb4',
  '93ca5c2f1eb63054f7c768a807408a43e65d7c68fe56e330db20af51',
  'cf635c0a032bc98d453b65512aaf2b0f9b0f62b2b865a6011523aaf7']
}

class ArdanaISOPools extends React.Component {
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
    autorefresh: false
  };

  async componentDidMount() {

    if (width < 600) {
      this.setState({ smallScreen: true });
    }
    await this.getIsoPools();
  }

  async refresher(refresh) {
    while (refresh) {
      await this.sleep(this.state.refreshAmount);
      this.getIsoPools();
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // async getSundaePools() {
  //   try {
  //     this.setState({ timerReset: null })
  //     var response = await fetch(baseUrlPoolPeekService + getisopools + 'ardanaiso');
  //     const data = await response.json();

  //     this.setState({ stats: data.poolDetailsSundaeStatsVO, timerReset: this.state.refreshAmount })
  //     this.createRows(data);
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  async getIsoPools() {
    try {
      this.setState({ timerReset: null })
      // var response = await fetch(baseUrlPoolPeekService + getisopoolsPost);

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isoPools)
      };
      var response = await fetch(baseUrlPoolPeekService + getisopoolsPost, requestOptions);
      const data = await response.json();

      this.setState({ stats: data.poolDetailsSundaeStatsVO, timerReset: this.state.refreshAmount })
      this.createRows(data);
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

  render() {

    return (
      <Page
        className="ArdanaISO"
        title="Ardana ISPO"
      >
        {this.state.loading ? <div><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
          : <Col>

            <Row style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <p>Auto refresh data: <FormControlLabel style={{ align: "center", display: 'inline-block' }} value="all"
                control={<Switch size="small" checked={this.state.autorefresh} onChange={e => this.handleAdvancedClick()}
                />}
              /></p></Row>

            {this.state.timerReset != null && this.state.autorefresh &&
              <Row style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <Timer
                  initialTime={this.state.timerReset}
                  direction="backward"
                >
                  <small>Data will refresh in: <Timer.Seconds /></small>
                </Timer></Row>}

            <Row>



              <Col lg={4} md={12} sm={12} xs={12} className="mb-3">

                <Col>
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <h3>Dates</h3>
                  </Row>
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                      <Card inverse color='primary'>
                        <CardBody body>
                          <CardTitle className="text-capitalize">
                            ISO Start Date
                          </CardTitle>
                          <CardText>
                          31st March
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                      <Card inverse color='secondary'>
                        <CardBody body>
                          <CardTitle className="text-capitalize">
                            ISO End Date
                          </CardTitle>
                          <CardText>
                            TBD
                          </CardText>
                        </CardBody>
                      </Card>
                    </Col>

                    {/* <Col lg={2} md={12} sm={12} xs={12} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Pools Involved
                        </CardTitle>
                        <CardText>
                          {this.state.stats.total_pools}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col> */}


                  </Row>
                </Col>

                <hr></hr>
                <Row style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <h3>ISO Announced Stats</h3>
                </Row>

                <Row style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>

                  <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          ADA Staked
                        </CardTitle>
                        <CardText>
                          495,485,016
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Wallets Delegated
                        </CardTitle>
                        <CardText>
                          32,545
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <hr></hr>
                <Row style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <h3>Live Stats</h3>
                </Row>

                <Row style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>

                  <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          ADA Staked
                        </CardTitle>
                        <CardText>
                          {this.addCommas(this.state.stats.total_live_stake)}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={6} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Wallets Delegated
                        </CardTitle>
                        <CardText>
                          {this.addCommas(this.state.stats.live_stake_delegator_count)}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <hr></hr>
                <Row style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                   <p>More info: <a href='https://medium.com/ardana-hub/cardano-start-up-ardana-set-to-launch-highly-anticipated-ispo-9597cd4c8d42' target="_blank" rel="noreferrer" ><b>HERE</b></a></p>
                </Row>

                <hr></hr>
                <Col style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <a href='https://discord.gg/c9skrZvsqH' target="_blank" rel="noreferrer" >
                    <p>SundaeSwap Discord</p> <FontAwesomeIcon size="2x" icon={faDiscord} /> </a>
                </Col>
              </Col>
              <Col lg={8} md={12} sm={12} xs={12} className="mb-3" style={{
                height: 700,
                overflow: 'auto'
              }}>
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12} className="mb-3">

                    <Card>

                      <CardBody body style={{
                        padding: '5px', margin: '0px',
                      }}>
                        <CardTitle className="text-capitalize">
                          <b>{this.state.stats.total_pools} Eligible Pools</b>
                        </CardTitle>
                        <small>Table sortable by clicking on the headers.</small><br></br>
                        <small style={{ color: 'red' }}>DONT STAKE</small><small>-</small>
                        <small style={{ color: 'orange' }}>RISK OF OVERSTAKE</small><small>-</small>
                        <small style={{ color: 'green' }}>STAKE HERE</small>
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
                                <th onClick={e => this.onSort(e, 'blocks')}>LifeTime Blocks</th>
                                <th onClick={e => this.onSort(e, 'pct_saturated')}>Filled</th>
                                <th></th>

                              </tr>
                            </thead>

                            {this.state.filterAblePools.map((item) => (
                              item.retired == 'N' &&
                              <tbody>

                                <tr style={
                                  this.getRowStyle(item.pct_saturated)
                                }>


                                  <td scope="row" ><p>{item.name}</p></td>
                                  <td scope="row"><p>{item.ticker}</p></td>
                                  <td scope="row"><p>{item.margin_pct}%</p></td>
                                  {/* <td style={tableRowStyle} scope="row"><p>{item.cost_per_epoch}₳</p></td> */}
                                  <td scope="row"><p>{this.addCommas(item.live_stake_delegator_count)}</p></td>
                                  <td scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                                  <td scope="row"><p>{this.addCommas(item.blocks)}</p></td>
                                  <td scope="row"><p>{Number(item.pct_saturated).toFixed(2)}%</p></td>

                                  <Row><Link to={`/pool/${item.pool_id}`} target="_blank" rel="noopener noreferrer">
                                    <p><Button variant="outline-light" size="sm">View</Button></p>
                                  </Link>
                                    {Number(item.pct_saturated) < 100 && <JoinPool pool={item} />}
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
                              item.retired == 'N' &&
                              <tbody>

                                <tr style={
                                  Number(item.pct_saturated) > 100
                                    ? tableRowStyleBad
                                    : tableRowStyle
                                } onClick={() => this.handleRowClick(item)}>
                                  <td scope="row" ><p>{item.name}<br />({item.ticker})</p></td>
                                  {/* <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td> */}
                                  <td scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                                  <td scope="row"><p>{Number(item.pct_saturated).toFixed(2)}%</p></td>
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
            </Row>
          </Col>}

      </Page>
    );
  }
}
export default ArdanaISOPools;