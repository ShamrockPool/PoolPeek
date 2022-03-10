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
import BlocksPage from 'pages/BlocksPage';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;


class BlocksListPage extends React.Component {
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
    window.scrollTo(0, 0);
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
        className="BlocksListPage"
        title="Blocks Minted In the Last 4 hours."
      >
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} >
            <BlocksPage numberToSHow={1000} />
          </Col>
        </Row>
      </Page>
    );
  }
}
export default BlocksListPage;
