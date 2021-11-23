import React from "react";
import {
    Button
} from 'reactstrap';
import { getPoolId, delegationTx, signTx, submitTx, getDelegation, blockfrostRequest } from "./Transactions";

//import Loader from "./loader";

// const S = import('@emurgo/cardano-serialization-lib-browser/cardano_serialization_lib.js');

const cardano = window.cardano;

const renderer = ({ hours, minutes, seconds, completed }) => {
    return <span>{minutes} Minutes {seconds} Seconds</span>;
};

export default class JoinPool extends React.Component {

    state = {
        loading: true,
        walletAddress: "thisisthewalletaddress",
        price: 0,
        paymentReceived: false,
        nftReserved: null,
        planetName: null,
        refreshedScreen: false
    };

    async componentDidMount() {
        window.scrollTo(0, 0);


    }


    async getProtocolParameters() {
        var HOST = "https://api.koios.rest:8453/rpc";
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
        await cardano.enable();
        var user = await cardano.getUsedAddresses();
        console.log(user)


        const delegation = await getDelegation(); // you can also use this one to check for current deleagation status (for the UI, like if the user is already delegate in the pool you just selected)
        // console.log('delegation', delegation)
        const targetPoolId = this.props.pool.pool_id;
        // console.log(`delegate to: ${targetPoolId}`)
        const tx = await delegationTx(delegation, targetPoolId);
        const signedTx = await signTx(tx);

        const txHash = await submitTx(signedTx);
        window.gtag('event', 'delegate', {
            pool_addr: targetPoolId,
            transaction_id: txHash,
            value: 1
        })
        console.log(`transaction submitted: ${txHash}`)
    }

    render() {
        return (

            <p><Button variant="outline-light" size="sm" onClick={() => this.joinPool()}>Join Pool</Button></p>
        );
    }
}

