import Page from 'components/Page';
import React, { useState, useEffect, useRef } from 'react';
import {
  Col,
  Card,
  CardBody,
  CardHeader,
  CardText,
  Row,
  Button,
  Input
} from 'reactstrap';

import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrlPoolPeekService, getPoolByStakeAddress, baseUrl, getPoolsRetiringAcrossEpoch } from '../assets/services';
import "../styles/styles.css";
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MyPoolRewardsChart from 'components/pool/MyPoolRewardsChart';
import { connect } from 'react-redux';
import { getWallet } from 'components/wallet/walletutil.js';

import AssetFingerprint from '@emurgo/cip14-js';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;

//const AssetFingerprint = require('@emurgo/cip14-js');

class MyWalletPage extends React.Component {
  state = {
    pools: null,
    loading: true,
    totalPools: '',
    smallScreen: false,
    searched: "",
    filterAblepools: [],
    retiredPools: [],
    retiredPoolsBkUp: [],
    totalPools: null,
    totalLiveStake: null,
    totalDelegates: null,
    stats: null,
    walletConnected: false,
    namiEnabled: false,
    retiringData: null,
    wallet: null,
    pool: null,
    walletBalance: 0,
    assetsInformationArray: []
  };

  useEffect() {
    this.setState({ wallet: this.props.wallet });
    console.log("called")
  };

  async componentDidMount() {
    window.scrollTo(0, 0);
    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    var wallet = this.props.wallet;
    this.setState({ wallet: wallet });
    await this.connectWalletAndPullData(wallet);

    this.getRetiringData();



  }

  componentWillReceiveProps(nextProps) {
    try {
      var wallet = nextProps.wallet;
      this.setState({ wallet: wallet });
      this.connectWalletAndPullData(wallet);
    } catch (error) {
    }
  }

  async connectWalletAndPullData(wallet) {
    try {
      if (wallet != "") {
        var connectedWallet = await getWallet(wallet);
        console.log(connectedWallet)
        this.getStakePool(connectedWallet);
        this.getBalance(connectedWallet);
      }
    } catch (error) {
    }
  }

  async getRetiringData() {
    var response = await fetch(baseUrl + getPoolsRetiringAcrossEpoch);
    var data = await response.json();
    this.setState({ retiringData: data });
  }

  async getBalance(connectedWallet) {
    const Loader = await import('@emurgo/cardano-serialization-lib-browser');
    const valueCBOR = await connectedWallet.getBalance()
    const value = Loader.Value.from_bytes(Buffer.from(valueCBOR, "hex"))

    const utxos = await connectedWallet.getUtxos()
    const parsedUtxos = utxos.map((utxo) => Loader.TransactionUnspentOutput.from_bytes(Buffer.from(utxo, "hex")))

    let countedValue = Loader.Value.new(Loader.BigNum.from_str("0"))
    parsedUtxos.forEach(element => { countedValue = countedValue.checked_add(element.output().amount()) });

    const availableAda = countedValue.coin();
    const lovelace = availableAda.to_str();
    const assets = [];
    if (value.multiasset()) {

      const multiAssets = value.multiasset().keys();
      for (let j = 0; j < multiAssets.len(); j++) {

        const policy = multiAssets.get(j);
        const policyAssets = value.multiasset().get(policy);
        const assetNames = policyAssets.keys();
        for (let k = 0; k < assetNames.len(); k++) {
          const policyAsset = assetNames.get(k);
          const quantity = policyAssets.get(policyAsset);
          const asset =
            Buffer.from(policy.to_bytes(), 'hex').toString('hex') +
            Buffer.from(policyAsset.name(), 'hex').toString('hex');
          const _policy = asset.slice(0, 56);
          const _name = asset.slice(56);

          const fingerprint = AssetFingerprint.fromParts(
            Buffer.from(_policy, 'hex'),
            Buffer.from(_name, 'hex')
          );

          assets.push({
            unit: asset,
            quantity: quantity.to_str(),
            policy: _policy,
            name: _name,
            fingerprint,
          });
        }
      }
    }

    var balance = lovelace / 1000000
    this.setState({ walletBalance: balance });


    //Get Assets
    var assetsInformationArray = [];
    for (let index = 0; index < assets.length; index++) {
      const asset = assets[index];

      //perform koios lookup
      // https://api.koios.rest/api/v0/asset_info?_asset_policy=d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a0&_asset_name=7370616365636f696e73
      const responseObj = await fetch("https://api.koios.rest/api/v0/asset_info?_asset_policy=" + asset.policy + "&_asset_name=" + asset.name);
      const assetInformation = await responseObj.json();

      console.log(assetInformation)

      var name = null;
      var policy = asset.policy;
      var quantity = asset.quantity;
      var type = "";
      var image = null;

      //get name
      try {
        name = assetInformation[0].minting_tx_metadata.json[assetInformation[0].policy_id][assetInformation[0].asset_name_ascii].name;
      } catch (error) {
      }
      if (!name) {
        try {
          name = assetInformation[0].asset_name_ascii;
        } catch (error) {
        }
      }


      //get image
      try {
        image = assetInformation[0].minting_tx_metadata.json[assetInformation[0].policy_id][assetInformation[0].asset_name_ascii].image;
        image = image.replace("ipfs://", "");
        image = image.replace("ipfs/", "");
        
      } catch (error) {
      }
      if (!name) {
        try {
          image = assetInformation[0].minting_tx_metadata.json[assetInformation[0].policy_id][assetInformation[0].asset_name].image;
          image = image.replace("ipfs://", "");
          image = image.replace("ipfs/", "");
        } catch (error) {
        }
      }
      if (!name) {
        try {
          image = assetInformation[0].minting_tx_metadata.json[assetInformation[0].policy_id][assetInformation[0].asset_name].icon;
          image = image.replace("ipfs://", "");
          image = image.replace("ipfs/", "");
        } catch (error) {
        }
      }
      if (!image) {
        try {
          image = assetInformation[0].minting_tx_metadata.json.asset.ipfs;
        } catch (error) {
        }
      }




      var assetInformationDisplay = {
        "name": name,
        "policy": policy,
        "quantity": quantity,
        "type": type,
        "image": image
      }

      assetsInformationArray.push(assetInformationDisplay);
    }
    console.log(assetsInformationArray);
    this.setState({ assetsInformationArray: assetsInformationArray });
  };

  async getStakePool(connectedWallet) {
    const Loader = await import('@emurgo/cardano-serialization-lib-browser');
    try {
      const walletAddress = await connectedWallet.getRewardAddresses();
      console.log(walletAddress);

      var walletAddressHex = Buffer.from(
        walletAddress[0],
        'hex'
      );
      var addressFromBytes = Loader.Address.from_bytes(walletAddressHex);
      var rewardAddress = Loader.RewardAddress.from_address(addressFromBytes)?.to_address().to_bech32();

      var response = await fetch(baseUrlPoolPeekService + getPoolByStakeAddress + rewardAddress);
      var data = await response.json();
      var pool = data.pools[0];
      console.log(pool)
      this.setState({ pool: pool, loading: false });
    } catch (error) {
      console.log(error);
    }
  }

  addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  }

  render() {

    return (
      <Page
        className="MyWalletPage"
        title="View Your Wallet Contents"
      >
        {this.state.pool == null ? <Col style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}><Row><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></Row><Row style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}><h1>Connect Wallet</h1></Row></Col>
          :
          <Row>
            <Col>
              <Row>

                <Col xl={12} lg={12} md={12} sm={12} >

                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Col xl={8} lg={10} md={12} sm={12} >

                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>
                        <h2>Balance</h2>
                      </Row>

                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}><h3><b>{this.state.walletBalance} ₳</b></h3></Row>
                      <Row style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}>

                        <Col style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}>
                          <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}>
                            <small><b>TOKENS</b></small>
                          </Row>
                          <Row>

                          </Row>
                        </Col>

                        <Col>
                          <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}>
                            <small><b>UTXOs</b></small>
                          </Row>
                          <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}>

                          </Row>
                        </Col>

                        <Col>
                          <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}>
                            <small><b>REWARDS</b></small>
                          </Row>
                          <Row style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                          }}>

                          </Row>
                        </Col>
                      </Row>

                    </Col>
                  </Row>

                </Col>

                <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                  <hr></hr>
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <h2>Staking</h2>
                  </Row>

                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}><h3><b>{this.state.pool.name}</b></h3></Row>
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Link to={`/pool/${this.state.pool.pool_id}`} target="_blank" rel="noopener noreferrer">
                      <p><Button variant="outline-light" size="sm">View</Button></p>
                    </Link>
                  </Row>

                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    {width > 800 && this.state.retiringData &&
                      <MyPoolRewardsChart retiringData={this.state.retiringData.poolRetire} />
                    }
                  </Row>

                </Col>

              </Row>
              <hr></hr>
              <Row>
                <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <h2>Assets</h2>
                  </Row>

                  <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    {this.state.assetsInformationArray.map(function (item, index) {
                      return (
                        <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                      
                          
                          <img src={"https://cloudflare-ipfs.com/ipfs/" + item.image} width="70" height="70" />
                          <p>{item.quantity}</p>
                          <p>{item.name}</p>
                          <br></br>
                        </Col>
                      )
                    })}
                  </Row>

                </Col>
              </Row>
            </Col>
          </Row>
        }
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    wallet: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setWallet: (walletType, wallet) => dispatch({ type: walletType, wallet: wallet }),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(MyWalletPage);

