import React from 'react';
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardText,
  Button,
  Nav,
  Navbar,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import bn from 'utils/bemnames';
import Timer from "react-compound-timer";
import { isMobile } from 'react-device-detect';
import { Provider, connect } from 'react-redux';
import nami from 'assets/img/wallet/nami.svg';
import flint from 'assets/img/wallet/flint2.png';
import eternl from 'assets/img/wallet/eternl.png';
import typhon from 'assets/img/wallet/typhon.png';
import yoroi from 'assets/img/wallet/yoroi.png';
import gero from 'assets/img/wallet/gerowallet.ico';

import { getWallet } from '../wallet/walletutil'

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
      currentEpoch: 0,
      modal: false,
      modal_backdrop: false,
      modal_nested_parent: false,
      modal_nested: false,
      connectedWallet: "",
      walletEnabled: false
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
    try {
      let response = await
        fetch('https://api.koios.rest/api/v0/tip');
      let data = await response.json();
      var epoch = data[0].epoch_no;
      this.setState({ currentEpoch: epoch });
      this.state.currentEpoch = epoch;
    } catch (error) {
      console.error(error)
    }

  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.getCurrentEpoch();
    await this.generateEpochEvents();


    // this.getCurrentAdaUSDPrice();
    // this.getCurrentAdaEuroPrice();
    // this.getCurrentAdaBTCPrice();
    // this.getCurrentAdaGBPPrice();
    // this.interval = setInterval(() => this.getCurrentAdaUSDPrice(), 30000);
    // this.interval = setInterval(() => this.getCurrentAdaEuroPrice(), 30000);
    // this.interval = setInterval(() => this.getCurrentAdaBTCPrice(), 30000);
    // this.interval = setInterval(() => this.getCurrentAdaGBPPrice(), 30000);

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
        this.setState({ epochSecondsRemaining: timeInEpoch });
        this.state.epochSecondsRemaining = timeInEpoch;
      }
      epoch++;
      epochDate = new Date(epochEndDate);
    }
  }

  async connectWallet(wallet) {
    try {

      wallet = wallet.toLowerCase();
      console.log("Connecting wallet")
      var walletEnabled = null;
      var cardano = window.cardano;

      walletEnabled = getWallet(wallet);

      if (walletEnabled !== null) {
        console.log("Wallet Enabled: " + wallet)
        this.props.setWallet(wallet);
        this.setState({ walletEnabled: true, connectedWallet: wallet });
        this.toggle();
      }
    } catch (error) {
      console.log(error)
    }
  };

  async removeWallet() {
    this.props.setWallet(null);
    this.setState({ walletEnabled: false });
    this.toggle();
  }

  async toggle() {
    return this.setState({
      modal: !this.state.modal,
    });
  };

  changeUserDetails = (field, value) => {
    this.props.updateCurrentUserData({ field: field, value: value });
  }

  render() {
    return (
      // <Navbar light expand className={bem.b('bg-white')}>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={18} />
          </Button>
        </Nav>
        {/* <Nav navbar>
          <div>
            <p><b>ADA Price:</b>  <b>   $</b>  {this.state.adaUsdPrice} <b>  €</b> {this.state.adaEuroPrice}
              <b>  £</b> {this.state.adaGbpPrice} <b>  ₿</b> {this.state.adaBtcPrice} </p>
            <div>
              <div>
                <h6><b>Current Epoch: {this.state.currentEpoch}</b></h6>
                {this.state.epochSecondsRemaining != 0 &&
                  <Timer
                    initialTime={this.state.epochSecondsRemaining}
                    direction="backward"
                  >
                    <small><b>( Epoch Remaining: </b>    <Timer.Days /> <b>Days</b>   <Timer.Hours />  <b>Hours</b>  <Timer.Minutes /> <b>Mins )</b> </small>
                  </Timer>}
              </div>
            </div>
          </div>
        </Nav> */}

        <Nav navbar>
          <div>
            {this.state.epochSecondsRemaining != 0 &&
              <Timer
                initialTime={this.state.epochSecondsRemaining}
                direction="backward"
              >
                <b>Current Epoch: {this.state.currentEpoch}</b> <small><b>  ( Epoch Remaining: </b>    <Timer.Days /> <b>Days</b>   <Timer.Hours />  <b>Hours</b>  <Timer.Minutes /> <b>Mins )</b> </small>
              </Timer>}
          </div>

        </Nav>


        {!isMobile &&
          <Nav navbar className={bem.e('nav-right')}>
            {this.state.walletEnabled == false ? <div>
              <Col>
                <Row><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Connect Wallet</Button></Row>
              </Col>
            </div>
              :
              <div>
                {this.state.connectedWallet === 'nami' &&
                  <Col>
                    <Row><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Nami Connected</Button></Row>
                  </Col>}
                {this.state.connectedWallet === 'flint' &&
                  <Col>
                    <Row><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Flint Connected</Button></Row>
                  </Col>}
                {this.state.connectedWallet === 'eternl' &&
                  <Col>
                    <Row><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Eternl Connected</Button></Row>
                  </Col>}
                {this.state.connectedWallet === 'typhon' &&
                  <Col>
                    <Row><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Typhon Connected</Button></Row>
                  </Col>}
                {this.state.connectedWallet === 'gero' &&
                  <Col>
                    <Row><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Gero Connected</Button></Row>
                  </Col>}
                {this.state.connectedWallet === 'yoroi' &&
                  <Col>
                    <Row><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Yoroi Connected</Button></Row>
                  </Col>}
              </div>
            }

          </Nav>}

        <Modal
          isOpen={this.state.modal}
          toggle={false}
        >
          <ModalHeader toggle={() => this.toggle()}>Select Wallet Type</ModalHeader>
          <ModalBody style={{
            alignContent: 'center', justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>


            <span className="box-url" onClick={() => this.connectWallet("Eternl")}>
              <div>
                <div className="row">
                  <div className="col-lg-2">
                    <img src={eternl} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                  <div className="col-lg-8 ">
                    <h6 aria-hidden="true" >Eternl</h6>
                  </div>
                  <div className="col-lg-2">
                    <img src={eternl} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                </div>
              </div>
            </span>



            <span className="box-url" onClick={() => this.connectWallet("Nami")}>
              <div>
                <div className="row">
                  <div className="col-lg-2">
                    <img src={nami} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                  <div className="col-lg-8 ">
                    <h6 aria-hidden="true" >Nami</h6>
                  </div>
                  <div className="col-lg-2">
                    <img src={nami} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                </div>
              </div>
            </span>

            <span className="box-url" onClick={() => this.connectWallet("Flint")}>
              <div>
                <div className="row">
                  <div className="col-lg-2">
                    <img src={flint} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                  <div className="col-lg-8 ">
                    <h6 aria-hidden="true" >Flint</h6>
                  </div>
                  <div className="col-lg-2">
                    <img src={flint} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                </div>
              </div>
            </span>


            <span className="box-url" onClick={() => this.connectWallet("Gero")}>
              <div>
                <div className="row">
                  <div className="col-lg-2">
                    <img src={gero} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                  <div className="col-lg-8 ">
                    <h6 aria-hidden="true" >Gero</h6>
                  </div>
                  <div className="col-lg-2">
                    <img src={gero} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                </div>
              </div>
            </span>

            <span className="box-url" onClick={() => this.connectWallet("Typhon")}>
              <div>
                <div className="row">
                  <div className="col-lg-2">
                    <img src={typhon} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                  <div className="col-lg-8 ">
                    <h6 aria-hidden="true" >Typhon</h6>
                  </div>
                  <div className="col-lg-2">
                    <img src={typhon} width={30} height={30} style={{
                      justifyContent: 'left',
                      alignItems: 'left'
                    }} />
                  </div>
                </div>
              </div>
            </span>


            {/* <div className="col-lg-8" >
              <span className="box-url" onClick={() => this.connectWallet("CardWallet")}>
                <div>
                  <div className="row">
                    <div className="col-lg-2">
                      <img src={cardwallet} width={30} height={30} style={{
                        justifyContent: 'left',
                        alignItems: 'left'
                      }} />
                    </div>
                    <div className="col-lg-8 ">
                      <h6 aria-hidden="true" >Card Wallet</h6>
                    </div>
                    <div className="col-lg-2">
                      <img src={cardwallet} width={30} height={30} style={{
                        justifyContent: 'left',
                        alignItems: 'left'
                      }} />
                    </div>
                  </div>
                </div>
              </span>
            </div> */}


          </ModalBody>
          <ModalFooter>
            {' '}
            {this.state.walletEnabled && 
            <Button color="secondary" onClick={() => this.removeWallet()}>
              Disconnect Wallet
            </Button>}
            <Button color="secondary" onClick={() => this.toggle()}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Navbar >
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWallet: (walletType) => dispatch({ type: "Select_wallet", wallet: walletType })
  }
};
export default connect(null, mapDispatchToProps)(Header);
