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

const bem = bn.create('header');


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adaUsdPrice: "",
      adaEuroPrice: "",
      adaBtcPrice: ""
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
    this.setState({ adaUsdPrice: "ADA USD Price: " +price });
  }

  async getCurrentAdaEuroPrice() {
    var url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADAEUR';
    let price = await this.fetchFromBinance(url);
    this.setState({ adaEuroPrice: "ADA EURO Price: " +price });
  }

  async getCurrentAdaBTCPrice() {
    var url = 'https://api.binance.com/api/v3/ticker/price?symbol=ADABTC';
    let price = await this.fetchFromBinance(url);
    this.setState({ adaEuroPrice: "ADA EURO Price: " +price });
  }


  async fetchFromBinance(url) {

    //await the response of the fetch call
    let response = await
      fetch(url);
    //proceed once the first promise is resolved.
    let data = await response.json()
    return data.price;
  }

  componentDidMount() {

    this.getCurrentAdaUSDPrice();
    this.getCurrentAdaEuroPrice();
    this.getCurrentAdaBTCPrice();
    console.log(this.state.adaUsdPrice);

    this.interval = setInterval(() => this.getCurrentAdaUSDPrice(), 15000);
    this.interval = setInterval(() => this.getCurrentAdaEuroPrice(), 15000);
    this.interval = setInterval(() => this.getCurrentAdaBTCPrice(), 15000);

  }

  render() {

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <div>
            <p>{this.state.adaUsdPrice}</p>
            <p>{this.state.adaEuroPrice}</p>
            <p>{this.state.adaBtcPrice}</p>
          </div>
          {/* <p>PoolPeek.com is a "light-weight" Cardano stake pool explorer that analyzes the publicly available registration data and other data elements such as number of produced blocks.</p>
          <p>If you would like to support our development efforts, please consider delegating to the LOCO Pool or Shamrock Pool</p> */}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
