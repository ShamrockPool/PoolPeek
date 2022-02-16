import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap';
import { getDelegation, blockfrostRequest, getUtxos, getAddress, getProtocolParameters, txBuilder, signSubmitTx } from "./Transactions";
import { Link } from 'react-router-dom';

const cardano = window.cardano;

const renderer = ({ hours, minutes, seconds, completed }) => {
    return <span>{minutes} Minutes {seconds} Seconds</span>;
};

// Helper functions
const hexToAscii = (hex) => {
    // connverts hex to ascii string
    var _hex = hex.toString();
    var str = "";
    for (var i = 0; i < _hex.length && _hex.substr(i, 2) !== "00"; i += 2)
        str += String.fromCharCode(parseInt(_hex.substr(i, 2), 16));
    return str;
};

var Loader;
var protocolParameter;
var delegation;
var user;
var stakeKeyHash;

export default class JoinPool extends React.Component {
    // https://github.com/Felippo001/nami-wallet-api
    state = {
        loading: true,
        walletAddress: "thisisthewalletaddress",
        price: 0,
        paymentReceived: false,
        nftReserved: null,
        planetName: null,
        refreshedScreen: false,

        modal: false,
        modal_backdrop: false,
        modal_nested_parent: false,
        modal_nested: false,

        namiEnabled: false,
    };

    async componentDidMount() {
        window.scrollTo(0, 0);

        try {
            var enabled = this.props.namiEnabled;
            this.setState({ namiEnabled:  enabled});
        } catch (error) {

        }



    }

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


    async getProtocolParameters() {
        var HOST = "https://api.koios.rest/api/v0/";
        const tip = await fetch(HOST + '/tip', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then((response) => response.json());
        var slotnumber = tip.epoch_slot;

        const epochInfo = await fetch(HOST + '/epoch_params', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'GET'
        }).then((response) => response.json());
        if (epochInfo.status >= 400 && epochInfo.status < 600) {
            throw new Error("Bad response from server");
        }

        var value = {
            linearFee: {
                coefficient: new Uint8Array(epochInfo.min_fee_a),
                constant: new Uint8Array(epochInfo.min_fee_b)
            },
            minUtxo: new Uint8Array(epochInfo.min_utxo),
            poolDeposit: new Uint8Array(epochInfo.pool_deposit),
            keyDeposit: new Uint8Array(epochInfo.key_deposit),
            maxTxSize: epochInfo.max_tx_size,
            slot: slotnumber,
        };
        return value;
    };

    async joinPool() {
        this.setState({ modal: true });
        //initialize loader
        Loader = await import('@emurgo/cardano-serialization-lib-browser');

        user = await cardano.getUsedAddresses();

        //get stake key hash
        stakeKeyHash = Loader.RewardAddress.from_address(
            Loader.Address.from_bytes(
                Buffer.from(
                    await cardano.getRewardAddress(),
                    'hex'
                )
            )
        ).payment_cred().to_keyhash().to_bytes();

        //get protocol params
        protocolParameter = await getProtocolParameters(Loader);

        //current delegation
        delegation = await getDelegation(Loader);

        //target pool id
        const targetPoolId = this.props.pool.pool_id;

        //get utxos
        //var utxos = await getUtxos();//.map(u => S.TransactionUnspentOutput.from_bytes(Buffer.from(u, 'hex')))
        //        var utxosMap = utxos.map(u => Loader.TransactionUnspentOutput.from_bytes(Buffer.from(u, 'hex')));       
        var Utxos = await cardano.getUtxos();
        var UtxosHex = Utxos.map(u => Loader.TransactionUnspentOutput.from_bytes(
            Buffer.from(
                u,
                'hex'
            )
        )
        );

        //paymentAddress
        var PaymentAddress = await getAddress(Loader);

        //outputs
        let outputs = Loader.TransactionOutputs.new()
        outputs.add(
            Loader.TransactionOutput.new(
                Loader.Address.from_bech32(PaymentAddress),
                Loader.Value.new(
                    Loader.BigNum.from_str(protocolParameter.keyDeposit)
                )
            )
        )

        //transaction
        let transaction = await txBuilder(Loader, {
            PaymentAddress,
            Utxos: UtxosHex,
            ProtocolParameter: protocolParameter,
            Outputs: outputs,
            Delegation: {
                poolHex: targetPoolId,
                stakeKeyHash: stakeKeyHash,
                delegation: delegation
            },
            Metadata: null,
            MetadataLabel: '721'
        });

        //submit trx

        let txHash = await signSubmitTx(Loader, transaction);



        var success = false;
    }

    render() {
        return (
            <div>
                {this.state.namiEnabled &&
                    <p><Button variant="outline-light" size="sm" onClick={() => this.joinPool()}>Join</Button>
                        <Modal
                            isOpen={this.state.modal}
                            toggle={false}
                            contentClassName="custom-modal-style"
                        >
                            <ModalHeader toggle={this.toggle()}>Join Pool</ModalHeader>
                            <ModalBody style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}>
                                <Row>
                                    <div>
                                        <p>You have selected to join Pool: <Link to={`/pool/${this.props.pool.pool_id}`}>{this.props.pool.name}</Link></p>
                                        <p>A Nami Wallet screen will appear to sign the transaction.</p>
                                        <p>Once complete your Nami Wallet will update to the new pool within a couple of minutes.</p>
                                        <br></br>
                                        <p>Happy staking.</p>
                                        <p>You can close this window.</p>
                                    </div>

                                </Row>

                            </ModalBody>
                        </Modal>
                    </p>}
            </div>

        );
    }
}

