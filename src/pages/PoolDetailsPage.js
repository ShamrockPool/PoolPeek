import Pool from 'components/pool/Pool';
import Page from 'components/Page';
import React from 'react';

const sid = Math.floor(Math.random() * 100) + Date.now()

class PoolDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      poolid: "",
      baseUrl: "https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&sid=" + sid,
      pool: null
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    this.getPool();
  }

  async getPool() {
    var response = await fetch(this.state.baseUrl + '&poolid=' + this.props.match.params.poolid);
    var data = await response.json();
    this.setState({ pool: data.poolpeek.pools[0] });
  }

  render() {
    return (
      <Page
        className="PoolDetailsPage"
      >
        {this.state.pool != null &&
          <Pool pool={this.state.pool} />}
      </Page>
    );
  }
}
export default PoolDetailsPage;
