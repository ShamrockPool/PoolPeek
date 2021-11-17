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
  Table
} from 'reactstrap';

import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrlPoolPeekService, getSundaeInfo } from '../assets/services';
import "../styles/styles.css";
import { isEmpty } from 'utils/stringutil.js';
// import SearchBar from "material-ui-search-bar";
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

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
  padding: 0,
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


class SundaePools extends React.Component {
  state = {
    pools: null,
    loading: true,
    totalPools: '',
    smallScreen: false,
    searched: "",
    filterAblepools: [],
    stats: null
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    this.getSundaePools();
  }

  async getSundaePools() {
    try {
      var response = await fetch(baseUrlPoolPeekService + getSundaeInfo);
      const data = await response.json();
      console.log(data);

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
                    <Card inverse color='primary'>
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
                          Waiting List SPO's
                        </CardTitle>
                        <CardText>
                          10
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <h2>End of Vote Stats</h2>
                </Row>


                <Row>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Total Pools
                        </CardTitle>
                        <CardText>
                          68
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Total Stake
                        </CardTitle>
                        <CardText>
                          {this.addCommas(Number(1.9346480739E9))}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Total Delegates
                        </CardTitle>
                        <CardText>
                          {this.addCommas(121131)}
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
                  <h2>Live Stats</h2>
                </Row>


                <Row>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='secondary'>
                      <CardBody body>
                        <CardTitle className="text-capitalize">
                          Live Total Pools
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
                          Live Total Stake
                        </CardTitle>
                        <CardText>
                          {this.addCommas(this.state.stats.total_live_stake)}
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>

                  <Col lg={4} md={6} sm={6} xs={6} className="mb-3">
                    <Card inverse color='primary'>
                      <CardBody>
                        <CardTitle className="text-capitalize">
                          Live Total Delegates
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
              <Table {...{ ['striped']: true }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    <th>Delegates</th>
                    <th>Live Stake</th>
                    <th>Saturation</th>

                  </tr>
                </thead>

                {this.state.filterAblePools.map((item) => (
                  <tbody>

                    <tr onClick={() => this.handleRowClick(item)}>
                      <td style={tableRowStyle} scope="row" ><p>{item.name}</p></td>
                      <td style={tableRowStyle} scope="row"><p>{item.ticker}</p></td>
                      <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake_delegator_count)}</p></td>
                      <td style={tableRowStyle} scope="row"><p>{this.addCommas(item.live_stake)}</p></td>
                      <td style={tableRowStyle} scope="row"><p>{Number(item.pct_saturated).toFixed(2)}%</p></td>
                    </tr>

                  </tbody>

                ))}

              </Table>
            </Row>

          </Col>



        }
      </Page>
    );
  }
}
export default SundaePools;
