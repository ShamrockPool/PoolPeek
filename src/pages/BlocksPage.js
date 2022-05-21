import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  CardText
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrlPoolPeekService, blocksFeed, blockfeeddashboard } from 'assets/services';
import Timer from "react-compound-timer";

class BlocksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      loading: true,
      refreshAmount: 60000,
      numberToShow: 0,
      timerReset: null
    };
  }


  async componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ numberToShow: this.props.numberToSHow });
    this.getBlocks();
  };

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getBlocks() {
    this.setState({ timerReset: null })

    var response = null;
    if(this.props.numberToSHow < 60){
      response = await fetch(baseUrlPoolPeekService + blockfeeddashboard);
    }else{
      response = await fetch(baseUrlPoolPeekService + blocksFeed);
    }

    var data = await response.json();
    this.setState({ blocks: data, loading: false });
    this.setState({ timerReset: this.state.refreshAmount });
    while (true) {
      await this.sleep(this.state.refreshAmount);
      this.setState({ timerReset: null })
      var response = await fetch(baseUrlPoolPeekService + blocksFeed);
      var data = await response.json();
      this.setState({ blocks: data, loading: false });
      this.setState({ timerReset: this.state.refreshAmount })
    }
  }

  msecondsToTime(msecs) {
    var hours = Math.floor(msecs / (60 * 60));

    var divisor_for_minutes = msecs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    return "h:" + hours + " m:" + minutes + " AGO";
  }

  render() {

    const toShow = this.state.numberToShow;

    return (
      <Card style={{
        display: 'block'
      }}>
        <CardHeader><h6><b>BLOCK FEED</b></h6>
          <small>Block Feed and the Pools who have minted the block. *Auto updates in :
            {this.state.timerReset != null && <Timer
              initialTime={this.state.timerReset}
              direction="backward"
            >
              <Timer.Seconds />
            </Timer>}</small>
        </CardHeader>
        {this.state.loading ? <CardBody body><div>loading...</div></CardBody>
          :
          this.state.blocks &&
          <CardBody body>
            <Row>
              {this.state.blocks.map(function (item, i) {
                return (
                  i < toShow &&
                  <Col key={i} lg={3} md={12} sm={12} xs={12}>
                    <Card style={{
                      flex: 1
                    }}>
                      <CardBody>
                        <CardHeader>
                          <h6><b>{item.ticker}</b></h6>
                        </CardHeader>
                        <CardText>
                          <b>&nbsp;{(Number(item.block_size) / Number(88000) * Number(100)).toFixed(0)}% size</b><br></br>
                          <b>&nbsp;{item.tx_count} txs</b><br></br>
                          <b>&nbsp;{(Math.floor(((new Date().getTime() - item.block_time_ms) / 1000) % 3600 / 60))} Mins Ago</b><br></br>
                          <small>&nbsp;{item.block_time.replace('T', ' ')} UTC</small><br></br>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          </CardBody>}
      </Card>
    );
  }
}
export default BlocksPage;
