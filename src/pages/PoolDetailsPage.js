import Pool from 'components/pool/Pool';
import PoolDetailsComponent from 'components/pool/PoolDetailsComponent';
import Page from 'components/Page';
import React from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrlPoolPeekService, getPoolById } from 'assets/services';
const sid = Math.floor(Math.random() * 100) + Date.now()

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class PoolDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      poolid: "",
      pool: null,
      loading: true
    }
  }



  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPool();
    console.log(this.state.pool);
  }

  async getPool() {
    //var response = await fetch(this.state.baseUrl + '&poolid=' + this.props.match.params.poolid);
    console.log(this.props.match.params.poolid);
    var response = await fetch(baseUrlPoolPeekService + getPoolById + this.props.match.params.poolid);
    var data = await response.json();
    console.log(data);
    this.setState({ pool: data.pools[0], loading: false });
  }

  render() {
    return (
      <Page
        className="PoolDetailsPage"
      >
        {this.state.loading ? <div><CircleLoader loading={this.state.loading} css={override} size={180} /></div>
          :
          <PoolDetailsComponent pool={this.state.pool} />}
      </Page>
    );
  }
}
export default PoolDetailsPage;
