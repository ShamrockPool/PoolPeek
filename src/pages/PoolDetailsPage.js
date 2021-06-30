import Pool from 'components/pool/Pool';
import PoolDetailsComponent from 'components/pool/PoolDetailsComponent';
import Page from 'components/Page';
import React from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
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
      baseUrl: "https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&sid=" + sid,
      pool: null,
      loading: true
    }
  }



  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPool();
  }

  async getPool() {
    var response = await fetch(this.state.baseUrl + '&poolid=' + this.props.match.params.poolid);
    var data = await response.json();
    this.setState({ pool: data.poolpeek.pools[0], loading: false });
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
