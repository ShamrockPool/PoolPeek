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
      <FetchPoolList query={this.props.query}/>
      </Page>
    );
  }
}
export default QuickQueriesPage;
