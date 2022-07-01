import Page from 'components/Page';
import React, { useState } from "react";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import { baseUrlPoolPeekService, getmappools } from '../assets/services';
import ReactGlobe from 'react-globe';
import {
  Col
} from 'reactstrap';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


// simple and extensive options to configure globe
const options = {
  cameraRotateSpeed: 0.6,
  focusAnimationDuration: 2000,
  focusEasingFunction: ['Linear', 'None'],
  pointLightColor: 'gold',
  pointLightIntensity: 1.5,
  globeGlowColor: 'blue',
  markerTooltipRenderer: marker => `${marker.city} (${marker.value})`,
};

class PoolMapV3 extends React.Component {
  state = {
    poolsData: null,
    loading: true
  };

  constructor(props) {
    super(props);
  }

  async getPoolLocationData() {
    const response = await fetch(baseUrlPoolPeekService + getmappools);
    return await response.json();
  }

  async componentDidMount() {
    var poolsData = await this.getPoolLocationData();
    this.state.poolsData = poolsData.pools;
    this.setState({ poolsData: poolsData, loading: false });
  }

  async handleLocationClick(location) {
    await this.sleep(2200);
    console.log(location);
    var url = '/poolsearch/' + location;
    this.props.history.push(url);
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


  render() {

    return (
      <Page
        className="RetiredPools"
        title="Pool Operator Map Search"
      >
        <Col style={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <h5>Use the below globe to find a pool operator using their location.</h5>
          <h6>Clicking a marker will list all pools in that area.</h6>
          {this.state.loading == true ? <GridLoader color={'#45b649'} loading={this.state.loading} css={override} size={100} />
            : (<ReactGlobe
              // globeTexture="https://unpkg.com/three-globe@2.21.6/example/img/earth-night.jpg"
              height="70vh"
              globeCloudsTexture={null}
              initialCoordinates={[53.1424, 7.6921]}
              markers={this.state.poolsData}
              options={options}
              width="100%"
              onClickMarker={(marker, markerObject, event) => this.handleLocationClick(marker.city)}
              // onMouseOutMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
              // onGlobeTextureLoaded={() => console.log('globe loaded')}
              // onMouseOverMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
            />)}

        </Col>
      </Page>
    )
  }
}
export default PoolMapV3;


// {

//   this.state.latSelected = markerObject[1];
//   this.state.longSelected = markerObject[0];
//   this.setState({ latSelected: markerObject[1], longSelected: markerObject[0] });

//   this.state.locationSelected = payload;
//   this.setState({ locationSelected: payload, isShown: true });
//   this.state.isShown = true;

//   var host = window.location.protocol + "//" + window.location.host;
//   this.openInNewTab(host + '/poolsearch/' + locationSelected);
// }