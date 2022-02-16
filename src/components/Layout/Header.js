import React from 'react';
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  Nav,
  Navbar,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import bn from 'utils/bemnames';
import nami from 'assets/img/namiicon.jpg';
import Timer from "react-compound-timer";
import { isMobile } from 'react-device-detect';
// 9.1.2

const bem = bn.create('header');
const cardano = window.cardano;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adaUsdPrice: "",
      adaEuroPrice: "",
      adaGbpPrice: "",
      adaBtcPrice: "",
      epochSecondsRemaining: 0,
      currentEpoch: 0,
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
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

  async getCurrentEpoch() {
    let response = await
      fetch('https://api.koios.rest/api/v0/tip');
    let data = await response.json();
    var epoch = data[0].epoch;
    this.setState({ currentEpoch: epoch });
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.generateEpochEvents();
    await this.getCurrentEpoch();

    try {
      var namiEnabled = await window.cardano.nami.isEnabled();
      this.setState({ namiEnabled: namiEnabled });

      if (this.state.namiEnabled) {
        await this.getNamiPool();
      }

    } catch (error) {
    }

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

  async connectWallet(wallet) {
    try {
      console.log("Connect Nami");
      var walletEnabled = false;
      var cardano = window.cardano;
      if (wallet == "nami") {
        walletEnabled = await cardano.nami.enable();
      } else if (wallet == "flint") {
        walletEnabled = await cardano.flint.enable();
      }
      this.setState({ namiEnabled: walletEnabled });
      window.location.reload(false);
    } catch (error) {
      console.log(error)
    }

  };

  toggle = modalType => () => {
    console.log("Connect Wallet")
    return this.setState({
      modal: !this.state.modal,
    });
  };

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

            <div>
              <p><b>Current Epoch: {this.state.currentEpoch}</b></p>
              {this.state.epochSecondsRemaining != 0 &&
                <Timer
                  initialTime={this.state.epochSecondsRemaining}
                  direction="backward"
                >
                  <h6><b>Epoch Change: </b>    <Timer.Days /> <b>Days</b>   <Timer.Hours />  <b>Hours</b>  <Timer.Minutes /> <b>Mins</b> </h6>
                </Timer>}
            </div>

            {/* //<b>Sec:</b> <Timer.Seconds />< */}

          </div>
        </Nav>
        {!isMobile &&
          <Nav navbar className={bem.e('nav-right')}>

            {this.state.namiEnabled === true ?
              <Row><Button variant="outline-light" size="sm">Wallet Connected</Button></Row>
              :
              <div style={{
                alignContent: 'center', justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
                <Row style={{
                  alignContent: 'center', justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                </Row>
                <Row style={{
                  alignContent: 'center', justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Connect Wallet</Button>
                </Row>
              </div>}

          </Nav>}

        <Modal
          isOpen={this.state.modal}
          toggle={false}
        >
          <ModalHeader toggle={this.toggle()}>Select Wallet Type</ModalHeader>
          <ModalBody style={{
            alignContent: 'center', justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>

            <Button variant="outline-light" size="sm" onClick={() => this.connectWallet("nami")}>Nami</Button>
            <p></p>
            <Button variant="outline-light" size="sm" >Flint - Coming Soon</Button> 
            {/* onClick={() => this.connectWallet("flint")} */}
          </ModalBody>
          <ModalFooter>
            {' '}
            <Button color="secondary" onClick={this.toggle()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>


      </Navbar >
    );
  }
}

export default Header;
