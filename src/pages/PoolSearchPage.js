import FetchPoolList from 'components/pool/FetchPoolList';
import Page from 'components/Page';
import React from 'react';
import { isEmpty } from 'utils/stringutil.js';
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



class PoolSearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      poolid: ""
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }



  render() {
    return (
      <Page
        className="PoolSearchPage"
      >
        {isEmpty(this.props.params.poolid) ? <FetchPoolList {...this.props} query={this.props.query} />
          :
          <FetchPoolList {...this.props} multiPoolOperators={false} query={this.props.query} poolid={this.props.params.poolid} />
        }


      </Page>
    );
  }
}
export default withRouter(PoolSearchPage);
