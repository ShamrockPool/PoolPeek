import React, { useState } from "react";
import MapChart from 'components/MapChart';

class PoolMap extends React.Component {
  state = {
    loading: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }


  render() {

    return (
      <div>
<MapChart />
    </div>
    )
  }
}
export default PoolMap;
