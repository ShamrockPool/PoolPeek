import React, { useState } from "react";
import RelayMapChart from 'components/RelayMapChart';
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";

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
    const response = await fetch("https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&sid=asdfklsdfjsldjflkjsdf&op=georelays");
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
          : (<RelayMapChart poolsData={this.state.poolsData}/>)}
      </div>
    )
  }
}
export default PoolMap;
