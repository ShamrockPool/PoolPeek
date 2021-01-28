import FetchPoolListQuickQuery from 'components/FetchPoolListQuickQuery';
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
      <FetchPoolListQuickQuery query={this.props.query}/>
      </Page>
    );
  }
}
export default QuickQueriesPage;
