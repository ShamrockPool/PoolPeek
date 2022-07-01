import Pool from 'components/pool/Pool';
import PoolDetailsComponent from 'components/pool/PoolDetailsComponent';
import Page from 'components/Page';
import React from 'react';
import CircleLoader from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import { baseUrlPoolPeekService, getPoolById } from 'assets/services';


import {useParams} from 'react-router-dom';

/* This is a higher order component that 
*  inject a special prop   to our component.
*/ 
function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams()
    return <Component {...props} params={params} />
  }
  return ComponentWithRouter
}


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
  }

  async getPool() {
    var response = await fetch(baseUrlPoolPeekService + getPoolById + this.props.params.poolid);
    var data = await response.json();
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

export default withRouter(PoolDetailsPage);
