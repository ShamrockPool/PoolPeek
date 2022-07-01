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
const bem = bn.create('header');

class ConnectWallet extends React.Component {
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
            namiEnabled: false
        };
    }

    async componentDidMount() {
        window.scrollTo(0, 0);


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
            console.log("Connecting wallet")
            var walletEnabled = null;
            var cardano = window.cardano;
            if (wallet === "nami") {
                walletEnabled = await cardano.nami.enable();
                if (walletEnabled != null) {
                    this.props.setWallet(wallet, walletEnabled);
                    this.setState({ namiEnabled: true, connectedWallet: wallet });
                    this.toggle()
                }
            } else if (wallet === "flint") {
                console.log("flint")
                walletEnabled = await cardano.flint.enable();
                console.log(walletEnabled)
                if (walletEnabled != null) {
                    this.props.setWallet(wallet, walletEnabled);
                    this.setState({ namiEnabled: true, connectedWallet: wallet });
                    this.toggle()
                }
            }
            else if (wallet === "eternl") {
                console.log("eternl")
                walletEnabled = await cardano.eternl.enable();
                console.log(walletEnabled)
                if (walletEnabled != null) {
                    this.props.setWallet(wallet, walletEnabled);
                    this.toggle()
                    this.setState({ namiEnabled: true, connectedWallet: wallet });
                }
            }
            else if (wallet === "typhon") {
                console.log("typhon")
                walletEnabled = await cardano.typhon.enable();

                if (walletEnabled !== null) {
                    console.log(walletEnabled)
                    this.props.setWallet(wallet, walletEnabled);
                    this.toggle()
                    this.setState({ namiEnabled: true, connectedWallet: wallet });
                }
            }
            else if (wallet === "gero") {
                console.log("gero")
                walletEnabled = await cardano.gerowallet.enable();
                console.log(walletEnabled)
                console.log("gero enabled")
                if (walletEnabled !== null) {
                    console.log(walletEnabled)
                    this.props.setWallet(wallet, walletEnabled);
                    this.toggle()
                    this.setState({ namiEnabled: true, connectedWallet: wallet });
                }
            }
            else if (wallet === "yoroi") {
                console.log("yoroi")
                walletEnabled = await cardano.yoroi.enable();
                console.log(walletEnabled)
                console.log("yoroi enabled")
                if (walletEnabled !== null) {
                    console.log(walletEnabled)
                    this.props.setWallet(wallet, walletEnabled);
                    this.toggle()
                    this.setState({ namiEnabled: true, connectedWallet: wallet });
                }
            }

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

    changeUserDetails = (field, value) => {
        this.props.updateCurrentUserData({ field: field, value: value });
    }

    render() {
        return (
            <Col lg={12} md={12} sm={12} xs={12} className="mb-3" style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                {this.state.namiEnabled == false ? <div>
                    <Col style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Connect Wallet</Button></Row>
                    </Col>
                </div>
                    :
                    <div style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                        {this.state.connectedWallet === 'nami' &&
                            <Col>
                                <Row style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Nami Connected</Button></Row>
                            </Col>}
                        {this.state.connectedWallet === 'flint' &&
                            <Col>
                                <Row style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Flint Connected</Button></Row>
                            </Col>}
                        {this.state.connectedWallet === 'eternl' &&
                            <Col>
                                <Row style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Eternl Connected</Button></Row>
                            </Col>}
                        {this.state.connectedWallet === 'typhon' &&
                            <Col>
                                <Row style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Typhon Connected</Button></Row>
                            </Col>}
                        {this.state.connectedWallet === 'gero' &&
                            <Col>
                                <Row style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}><Button variant="outline-light" size="sm" onClick={() => this.setState({ modal: true })}>Gero Connected</Button></Row>
                            </Col>}
                    </div>}




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
                        <Row style={{
                            alignContent: 'center', justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <img
                                src={nami} width="100vh" height="100vh" onClick={() => this.connectWallet("nami")}
                            />
                            <p></p>
                            <img
                                src={flint} width="100vh" height="100vh" onClick={() => this.connectWallet("flint")}
                            />
                            <p></p>
                            <img
                                src={eternl} width="100vh" height="100vh" onClick={() => this.connectWallet("eternl")}
                            />
                        </Row>
                        <br></br>
                        <Row style={{
                            alignContent: 'center', justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <img
                                src={typhon} width="100vh" height="100vh" onClick={() => this.connectWallet("typhon")}
                            />
                            {/* <img
                src={yoroi} width="100vh" height="100vh" onClick={() => this.connectWallet("yoroi")}
              /> */}
                            <img
                                src={gero} width="100vh" height="100vh" onClick={() => this.connectWallet("gero")}
                            />
                        </Row>

                        <Row style={{
                            alignContent: 'center', justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            {this.state.connectedWallet !== '' && <p>Wallet enabled: <b>{this.state.connectedWallet}</b></p>}
                        </Row>

                    </ModalBody>
                    <ModalFooter>
                        {' '}
                        <Button color="secondary" onClick={this.toggle()}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state
    };
};
const mapDispatchToProps = dispatch => {
    return {
        setWallet: (walletType, wallet) => dispatch({ type: walletType, wallet: wallet }),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ConnectWallet);
