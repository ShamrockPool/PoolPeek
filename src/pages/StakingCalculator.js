
import Page from 'components/Page';
import React from 'react';
import { Input, Table, Button, Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, } from 'reactstrap';
import { isEmpty } from 'utils/stringutil.js';

const inputnamewidth = 3;
const inputfieldwidth = 14;

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const cardBodyStyle = {
  borderBottom: 'solid 3px green',
  borderTop: 'solid 3px green',
  borderRight: 'solid 3px green',
  borderLeft: 'solid 3px green',
  // background: 'green',
  // color: 'white',
  paddingBottom: 0,
  paddingTop: 5,
  paddingLeft: 10,
  paddingRight: 10,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
};

const tableRowStyle = {
  // borderBottom: 'solid 3px blue',
  // background: 'green',
  // color: 'white',
  fontWeight: 'bold',
  padding: 0,
  paddingBottom: 5
};


class StakingCalculator extends React.Component {
  state = {
    loading: true,
    stakingAddress: null,
    stakingRewardsList: null,
    dailyRewards: null,
    epochRewards: null,
    monthlyReqards: null,
    yearlyRewards: null,
    currency: 'USD',
    currencySymbol: '',
    totalAda: 0,
    adaPrice: 0
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.setState({ loading: false });
    this.calculateRewards();
  }

  handleCurrencyChange = (query) => (e) => {
    this.setState({ currency: e.target.value });
    this.state.currency = e.target.value;
    this.calculateRewards();
  }

  handleAdaChange = (query) => (e) => {
    this.setState({ totalAda: e.target.value });

    clearTimeout(this.inputTimer);
    this.inputTimer = setTimeout((e) => {
        this.calculateRewards();
    }, 400);
  }

  async getCurrentAdaPrice(currency) {
    var url;
    if (currency == "USD") {
      url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT';
    }
    else if (currency == "EURO") {
      url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAEUR';
    }
    else if (currency == "GBP") {
      url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAGBP';
    }
    else {
      url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADABTC';
    }

    //await the response of the fetch call
    let response = await
      fetch(url);
    //proceed once the first promise is resolved.
    let data = await response.json()
    return data.price;
  }

  async calculateRewards() {
    var roi = 0.05;
    var adaPrice = 0;

    if (this.state.currency == 'USD') {
      this.setState({ currencySymbol: '$' });
      this.state.currencySymbol = '$';
    }

    if (this.state.currency == 'EURO') {
      this.state.currencySymbol = '€';
      this.setState({ currencySymbol: '€' });
    }

    if (this.state.currency == 'GBP') {
      this.state.currencySymbol = '£';
      this.setState({ currencySymbol: '£' });
    }

    if (this.state.currency == 'BTC') {
      this.state.currencySymbol = '';
      this.setState({ currencySymbol: '' });
    }


    var dailyRewards = this.state.totalAda * roi / 365;
    this.setState({ dailyRewards: dailyRewards });
    var epochRewards = dailyRewards * 5;
    this.setState({ epochRewards: epochRewards });
    var monthlyReqards = this.state.totalAda * roi / 12;
    this.setState({ monthlyReqards: monthlyReqards });
    var yearlyRewards = this.state.totalAda * roi;
    this.setState({ yearlyRewards: yearlyRewards });

    adaPrice = await this.getCurrentAdaPrice(this.state.currency);
    this.setState({ adaPrice: adaPrice });
  }

  render() {

    return (
      <Page
        className="StakingRewardsPage"
        title={this.props.title}
      >
        <div style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Card style={cardBodyStyle} body>
            <h4><b>Staking calculator</b></h4>
            <h7>Enter the amount of ADA you hold to get a rough estimation on how much rewards you will obtain per day, epoch(5days), month, yearly.</h7>
            <br></br>
            <h7>We have also connected to Binance API's for realtime pricing. </h7>
            <br></br>
            <h4><b>Select fiat currency</b></h4>
            <FormGroup row>
              <Col sm={inputfieldwidth}>
                <Input type="select" name="select" onChange={this.handleCurrencyChange()}
                  value={this.state.currency}>
                  <option>USD</option>
                  <option>EURO</option>
                  <option>GBP</option>
                  <option>BTC</option>
                </Input></Col>
            </FormGroup>
            <br></br>
            <h4><b>How much ADA do you own</b></h4>
            <FormGroup row>
              <Col sm={inputfieldwidth}>
                <Input
                  style={{ fontSize: 14 }}
                  type="text"
                  className="cr-search-form__input"
                  placeholder=""
                  value={this.state.stakingAddress}
                  onChange={this.handleAdaChange()}
                />
              </Col>
            </FormGroup>

            <div style={{ width: "100%", alignItems: "left", textAlign: 'left', }}>
              <h4><b>ADA Rewards</b></h4>
              <small>These rewards are calculated at a 5% yearly return.</small>
              <br></br>
              <Table {...{ ['striped']: true }}>
                <thead>
                  <tr>
                    <th>Daily</th>
                    <th>Epoch</th>
                    <th>Monthly</th>
                    <th>Yearly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tableRowStyle} scope="row"><p>{Number(this.state.dailyRewards).toFixed(2)}</p></td>
                    <td style={tableRowStyle} scope="row"><p>{Number(this.state.epochRewards).toFixed(2)}</p></td>
                    <td style={tableRowStyle} scope="row"><p>{Number(this.state.monthlyReqards).toFixed(2)}</p></td>
                    <td style={tableRowStyle} scope="row"><p>{Number(this.state.yearlyRewards).toFixed(2)}</p></td>
                  </tr>
                </tbody>
              </Table>
            </div >

            <br></br>

            <div style={{ width: "100%", alignItems: "left", textAlign: 'left', }}>
              <h4><b>Fiat Rewards</b></h4>
              <small>How much Fiat the rewards are worth.</small>
              <br></br>
              <Table {...{ ['striped']: true }}>
                <thead>
                  <tr>
                    <th>Daily</th>
                    <th>Epoch</th>
                    <th>Monthly</th>
                    <th>Yearly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tableRowStyle} scope="row"><p>{this.state.currencySymbol} {Number(this.state.dailyRewards * this.state.adaPrice).toFixed(2)}</p></td>
                    <td style={tableRowStyle} scope="row"><p>{this.state.currencySymbol} {Number(this.state.epochRewards * this.state.adaPrice).toFixed(2)}</p></td>
                    <td style={tableRowStyle} scope="row"><p>{this.state.currencySymbol} {Number(this.state.monthlyReqards * this.state.adaPrice).toFixed(2)}</p></td>
                    <td style={tableRowStyle} scope="row"><p>{this.state.currencySymbol} {Number(this.state.yearlyRewards * this.state.adaPrice).toFixed(2)}</p></td>
                  </tr>
                </tbody>
              </Table>
            </div >

          </Card>
        </div>
      </Page>
    );
  }
}
export default StakingCalculator;
