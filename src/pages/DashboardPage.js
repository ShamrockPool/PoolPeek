import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';

class DashboardPage extends React.Component {
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
        className="DashboardPage"
      // title="Pool Search"
      // breadcrumbs={[{ name: 'Home', active: true }]}
      >
        <FetchPoolList query={this.props.query} multiPoolOperators={true} poolid={this.props.match.params.poolid} />
      </Page>
    );
  }
}
export default DashboardPage;
