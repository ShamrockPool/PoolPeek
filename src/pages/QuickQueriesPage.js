import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';

class QuickQueriesPage extends React.Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="QuickQueriesPage"
        title={this.props.title}
      >
      <div>Our text based pool queries look for keywords in the pool's data, 
      the search is not exact and user is left to decide if the pool meets the actual criteria. 
      This gives us the flexibility to filter pools in ways other sites can't. 
      If you believe a pool is missing from one of our Pool Queries or you have an idea for a new Pool Query, contact us with the details.
      <br/><br/>
      </div>

      <FetchPoolList query={this.props.query}/>
      </Page>
    );
  }
}
export default QuickQueriesPage;
