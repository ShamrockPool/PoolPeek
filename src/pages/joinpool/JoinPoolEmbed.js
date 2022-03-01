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
import JoinPool from 'components/wallet/JoinPool';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import "../../styles/styles.css";
import { isEmpty } from 'utils/stringutil.js';
import ConnectWallet from './ConnectWallet';
import { connect } from 'react-redux';
const cardano = window.cardano;
const width = window.innerWidth;


class JoinPoolEmbed extends React.Component {
  state = {
    stats: null,
    walletConnected: false,
    namiEnabled: false,
    poolId: "",
    name: ""
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {

    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    if (!isEmpty(this.props.match)) {
      if (this.props.match.params.poolid) {
        this.setState({ poolId: this.props.match.params.poolid });
      }
      if (this.props.match.params.name) {
        this.setState({ name: this.props.match.params.name });
      }
    }

    window.scrollTo(0, 0);
  }


  getCreateJoinPool() {
    return { pool: { pool_id: this.state.poolId } };
  }





  render() {

    return (
      <Page
        className="JoinPoolEmbed"
        title="Join Pool"
      >
        {this.state.poolId != "" &&
          <Col lg={12} md={12} sm={12} xs={12} className="mb-3" style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>

            <ConnectWallet />
            <JoinPool pool_id={this.state.poolId} name={this.state.name} />
          </Col>}
        <Row><p>Functionality brought to you by <a href="https://poolpeek.com/#/" target="_blank">PoolPeek.com</a></p></Row>
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
      wallet: state
  };
};
export default connect(mapStateToProps)(JoinPoolEmbed);
