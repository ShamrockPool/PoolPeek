import React, { useState } from "react";
import MapChart from 'components/MapChart';
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import { baseUrlPoolPeekService, allPoolsPPS } from '../assets/services';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PoolMap extends React.Component {
  state = {
    poolsData: null,
    loading: true
  };

  constructor(props) {
    super(props);
  }

  async getPoolLocationData() {
    const response = await fetch(baseUrlPoolPeekService + allPoolsPPS);
    return await response.json();
  }

  async componentDidMount() {
    var poolsData = await this.getPoolLocationData();
    this.state.poolsData = poolsData;
    this.setState({ poolsData: poolsData });
    this.setState({ loading: false });
  }


  render() {

    return (
      <div>
        {this.state.loading == true  ? <GridLoader color={'#45b649'} loading={this.state.loading} css={override} size={100} />
          : (<MapChart poolsData={this.state.poolsData}/>)}
      </div>
    )
  }
}
export default PoolMap;
