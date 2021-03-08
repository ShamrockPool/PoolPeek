import React, { useState } from "react";
import MapChart from 'components/MapChart';
import ReactTooltip from "react-tooltip";



class PoolMap extends React.Component {
  state = {
    poolsData: null
  };

  constructor(props) {
    super(props);
  }

  async getPoolLocationData() {
    const response = await fetch("https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&sid=asdfklsdfjsldjflkjsdf&op=geo");
    return await response.json();
  }

  async componentDidMount() {
    var poolsData = await this.getPoolLocationData();
    this.state.poolsData = poolsData;
    this.setState({ poolsData: poolsData });
  }


  render() {

    return (
      <div>
        {this.state.poolsData && (<MapChart poolsData={this.state.poolsData}/>)}
      </div>
    )
  }
}
export default PoolMap;
