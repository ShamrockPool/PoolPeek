import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';

class DashboardPage extends React.Component {
  state = { searchText: "" }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        // title="Pool Search"
        // breadcrumbs={[{ name: 'Home', active: true }]}
      >
      <FetchPoolList query={this.props.query} multiPoolOperators={true}/>
      </Page>
    );
  }
}
export default DashboardPage;
