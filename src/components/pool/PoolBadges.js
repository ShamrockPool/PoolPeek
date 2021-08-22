import React, { useState } from 'react';
import {
    Media, Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap';
import { baseUrlPoolPeekService, mintNFT } from 'assets/services';
import blocks_1 from 'assets/img/poolbadges/1st.png';
import blocks_5 from 'assets/img/poolbadges/5th.png';
import blocks_10 from 'assets/img/poolbadges/10th.png';
import blocks_25 from 'assets/img/poolbadges/25th.png';
import blocks_50 from 'assets/img/poolbadges/50th.png';
import blocks_100 from 'assets/img/poolbadges/100th.png';
import blocks_200 from 'assets/img/poolbadges/200th.png';
import blocks_250 from 'assets/img/poolbadges/250th.png';
import blocks_500 from 'assets/img/poolbadges/500th.png';
import blocks_1000 from 'assets/img/poolbadges/1000th.png';
import blocks_1500 from 'assets/img/poolbadges/1500th.png';
import blocks_2000 from 'assets/img/poolbadges/2000th.png';
import blocks_3000 from 'assets/img/poolbadges/3000th.png';
import blocks_4000 from 'assets/img/poolbadges/4000th.png';
import blocks_5000 from 'assets/img/poolbadges/5000th.png';
import { Row, Button } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import ModalImage from "react-modal-image";

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;


const badgeWidth = 500;
const padding = "10px";
export default class PoolBadges extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delegatesList: null,
            loading: true,
            modal: false,
            modal_backdrop: false,
            modal_nested_parent: false,
            modal_nested: false,
            nftname: null,
            nftresponse: null,
            copied: null
        };

    }

    componentDidMount() {

    }

    handleClick = name => () => {
        console.log(name);
        this.setState({ modal: true, nftname: name });
    };

    mintNftVersion = name => () => {
        console.log(name);
    };

    toggle = modalType => () => {
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }

        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
        });
    };

    async mintNFT() {
        var response = await fetch(baseUrlPoolPeekService + mintNFT + this.getNftID(this.state.nftname));
        var data = await response.json();

        this.setState({ nftresponse: data });
    }

    getNftID(name) {
        if (name == 'blocks_1') {
            return 85743;
        } else if (name == 'blocks_5') {
            return 85744;
        } else if (name == 'blocks_10') {
            return 85747;
        } else if (name == 'blocks_25') {
            return 85748;
        } else if (name == 'blocks_50') {
            return 85749;
        } else if (name == 'blocks_100') {
            return 85750;
        } else if (name == 'blocks_200') {
            return 85751;
        } else if (name == 'blocks_250') {
            return 85752;
        } else if (name == 'blocks_500') {
            return 85753;
        } else if (name == 'blocks_1000') {
            return 85754;
        } else if (name == 'blocks_1500') {
            return 85758;
        } else if (name == 'blocks_2000') {
            return 85761;
        } else if (name == 'blocks_3000') {
            return 85762;
        } else if (name == 'blocks_4000') {
            return 85763;
        } else if (name == 'blocks_5000') {
            return 85764;
        }else if (name == 'blocks_1_gif') {//START OF GIFS
            return 85771;
        } else if (name == 'blocks_5_gif') {
            return 85773;
        } else if (name == 'blocks_10_gif') {
            return 85774;
        } else if (name == 'blocks_25_gif') {
            return 85775;
        } else if (name == 'blocks_50_gif') {
            return 85777;
        } else if (name == 'blocks_100_gif') {
            return 85778;
        } else if (name == 'blocks_200_gif') {
            return 85781;
        } else if (name == 'blocks_250_gif') {
            return 85782;
        } else if (name == 'blocks_500_gif') {
            return 85792;
        } else if (name == 'blocks_1000_gif') {
            return 85793;
        } else if (name == 'blocks_1500_gif') {
            return 85799;
        } else if (name == 'blocks_2000_gif') {
            return 85800;
        } else if (name == 'blocks_3000_gif') {
            return 85801;
        } else if (name == 'blocks_4000_gif') {
            return 85802;
        } else if (name == 'blocks_5000_gif') {
            return 85803;
        }

    }

    setExpiryTime() {
        var twentyMinutesLater = new Date();
        twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 20);
        return twentyMinutesLater.toLocaleString();
    }

    render() {
        return (
            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    {Number(this.props.poolBlocksTotal) > 4999 &&
                        <div>
                            <ModalImage
                                small={blocks_5000}
                                large={blocks_5000}
                                style={{ width: badgeWidth, height: 'auto' }}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_5000")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_5000_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 3999 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_4000}
                                large={blocks_4000}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_4000")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_4000_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 2999 &&
                        <div style={{ width: badgeWidth, height: 'auto' }}>
                            <ModalImage
                                small={blocks_3000}
                                large={blocks_3000}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_3000")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_3000_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 1999 &&
                        <div style={{ width: badgeWidth, height: 'auto' }}>
                            <ModalImage
                                small={blocks_2000}
                                large={blocks_2000}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_2000")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_2000_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 1499 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_1500}
                                large={blocks_1500}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_1500")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_1500_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 999 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_1000}
                                large={blocks_1000}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_1000")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_1000_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 499 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_500}
                                large={blocks_500}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_500")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_500_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 249 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_250}
                                large={blocks_250}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_250")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_250_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }


                    {Number(this.props.poolBlocksTotal) > 199 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_200}
                                large={blocks_200}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_200")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_200_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 99 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_100}
                                large={blocks_100}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_100")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_100_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 49 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_50}
                                large={blocks_50}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_50")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_50_gif")}>Mint as GIF NFT</Button>
                        </div>}

                    {Number(this.props.poolBlocksTotal) > 24 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_25}
                                large={blocks_25}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_25")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_25_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 9 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_10}
                                large={blocks_10}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_10")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_10_gif")}>Mint as GIF NFT</Button>
                        </div>}

                    {Number(this.props.poolBlocksTotal) > 4 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_5}
                                large={blocks_5}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_5")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_5_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 0 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_1}
                                large={blocks_1}
                            />
                            <Button variant="outline-light" onClick={this.handleClick("blocks_1")}>Mint as NFT</Button>
                            <Button variant="outline-light" onClick={this.handleClick("blocks_1_gif")}>Mint as GIF NFT</Button>
                        </div>
                    }


                    <Modal
                        isOpen={this.state.modal}
                        toggle={false}
                        contentClassName="custom-modal-style"
                    >
                        <ModalHeader toggle={this.toggle()}>Mint NFT</ModalHeader>
                        <ModalBody style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}>
                            <Row tyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}>
                                <div tyle={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}>
                                    <p>You have choosen to mint nft: {this.state.nftname}</p>
                                    <p >Once you click the MINT button you will be presented with a payment address and an amount.</p>
                                    <p style={{ color: 'red' }}>You will then have 20 minutes to pay before the transaction expires.</p>
                                    <p style={{ color: 'red' }}>Recommendation is to have your wallet ready.</p>
                                    <Button color="secondary" onClick={() => { this.mintNFT() }}>
                                        MINT
                                    </Button>
                                </div>
                                {this.state.nftresponse != null &&
                                    <div>
                                        <br></br>
                                        <p><b>Payment Address:</b> {this.state.nftresponse.paymentAddress}</p>
                                        <CopyToClipboard text={this.state.nftresponse.paymentAddress}
                                            onCopy={() => this.setState({ copied: true })}>
                                            <FontAwesomeIcon icon={faClipboard} />
                                        </CopyToClipboard>
                                        {this.state.copied ? <span style={{ color: 'red' }}>Copied.</span> : null}

                                        <p><b>ADA Price:</b> {this.state.nftresponse.adaToSend}</p>
                                        <p><b>Expiry Time:</b> {this.setExpiryTime()}</p>
                                    </div>}
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            {' '}
                            <Button color="secondary" onClick={this.toggle()}>
                                Close
                            </Button>
                        </ModalFooter>
                    </Modal>

                </Row>
            </div >
        )
    };
};

