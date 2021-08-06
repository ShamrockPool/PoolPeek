import React, { useState } from "react";
import MapChartV2 from 'components/MapChartV2';
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import { baseUrlPoolPeekService, getmappools } from '../assets/services';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class PoolMapV2 extends React.Component {
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
    this.setState({ poolsData: poolsData.pools });
    this.setState({ loading: false });
  }


  render() {

    return (
      <div>
        {this.state.loading == true  ? <GridLoader color={'#45b649'} loading={this.state.loading} css={override} size={100} />
          : (<MapChartV2 poolsData={this.state.poolsData}/>)}
      </div>
    )
  }
}
export default PoolMapV2;
