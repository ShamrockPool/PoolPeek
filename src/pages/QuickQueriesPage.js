import FetchPoolList from 'components/pool/FetchPoolList';
import Page from 'components/Page';
import React from 'react';
require('../styles/reduction.scss');
class QuickQueriesPage extends React.Component {

  constructor(props) {
    super(props);
  }


  getPageDescription() {

    if(this.props.pageDescription != undefined)
    {
      return this.props.pageDescription;
    }

    return "Our text based pool queries look for keywords in the pool's data, the search is not exact and user is left to decide if the pool meets the actual criteria. This gives us the flexibility to filter pools in ways other sites can't."
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
        <div>{this.getPageDescription()}
          <br /><br />
        </div>
        <FetchPoolList query={this.props.query} multiPoolOperators={this.props.multiPoolOperators}/>
      </Page>
    );
  }
}
export default QuickQueriesPage;
