import React from 'react';
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  Nav,
  Navbar,
} from 'reactstrap';
import bn from 'utils/bemnames';
import SearchInput from 'components/SearchInput';

import Timer from "react-compound-timer";


const bem = bn.create('header');


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adaUsdPrice: "",
      adaEuroPrice: "",
      adaGbpPrice: "",
      adaBtcPrice: "",
      epochSecondsRemaining: 0,
    };
  }

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  async getCurrentAdaUSDPrice() {
    var url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAUSDT';
    let price = await this.fetchFromBinance(url);
    this.setState({ adaUsdPrice: price });
  }

  async getCurrentAdaEuroPrice() {
    var url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAEUR';
    let price = await this.fetchFromBinance(url);
    this.setState({ adaEuroPrice: price });
  }

  async getCurrentAdaGBPPrice() {
    var url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAGBP';
    let price = await this.fetchFromBinance(url);
    this.setState({ adaGbpPrice: price });
  }

  async getCurrentAdaBTCPrice() {
    var url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADABTC';
    let price = await this.fetchFromBinance(url);
    this.setState({ adaBtcPrice: price });
  }


  async fetchFromBinance(url) {

    //await the response of the fetch call
    let response = await
      fetch(url);
    //proceed once the first promise is resolved.
    let data = await response.json()
    return data.price;
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.generateEpochEvents();

    this.getCurrentAdaUSDPrice();
    this.getCurrentAdaEuroPrice();
    this.getCurrentAdaBTCPrice();
    this.getCurrentAdaGBPPrice();
    this.interval = setInterval(() => this.getCurrentAdaUSDPrice(), 30000);
    this.interval = setInterval(() => this.getCurrentAdaEuroPrice(), 30000);
    this.interval = setInterval(() => this.getCurrentAdaBTCPrice(), 30000);
    this.interval = setInterval(() => this.getCurrentAdaGBPPrice(), 30000);

  }

  async generateEpochEvents() {
    var epochDate = new Date(2017, 8, 23, 21, 44, 59);
    var today = new Date(new Date().toUTCString());
    var endDate = new Date(today.getFullYear(), 12, 31, 21, 45);

    var epoch = 0;
    var epochLength = 5;

    while (epochDate.getTime() < endDate.getTime()) {
      var epochEndDate = new Date(epochDate);
      epochEndDate.setDate(epochEndDate.getDate() + epochLength);

      if (today > epochDate && today < epochEndDate) {
        var timeInEpoch = epochEndDate.getTime() - new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
        //  this.state.epochSecondsRemaining = timeInEpoch;
        this.setState({ epochSecondsRemaining: timeInEpoch });
        this.state.epochSecondsRemaining = timeInEpoch;
      }
      epoch++;
      epochDate = new Date(epochEndDate);
    }
  }

  render() {

    return (
      // <Navbar light expand className={bem.b('bg-white')}>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <div>
            <p><b>ADA Price:</b>  <b>   $</b>  {this.state.adaUsdPrice} <b>  €</b> {this.state.adaEuroPrice}
              <b>  £</b> {this.state.adaGbpPrice} <b>  ₿</b> {this.state.adaBtcPrice} </p>
            {this.state.epochSecondsRemaining != 0 &&
              <Timer
                initialTime={this.state.epochSecondsRemaining}
                direction="backward"
              >
                <h6><b>Epoch Change:</b>  <b>Days:</b>  <Timer.Days />  <b>Hours:</b> <Timer.Hours />   <b>Mins:</b> <Timer.Minutes /> </h6>
              </Timer>}

              {/* //<b>Sec:</b> <Timer.Seconds />< */}
              
          </div>
        </Nav>
        {/* <Nav navbar className={bem.e('nav-right')}>
          {this.state.allpools != null &&
            <SearchInput allpools={this.state.allpools} />
          }
        </Nav> */}
      </Navbar >
    );
  }
}

export default Header;
