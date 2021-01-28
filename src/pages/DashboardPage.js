import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';

class DashboardPage extends React.Component {
  state = { searchText: "" }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getSearchText = async(text) => {
    console.log("Dashboard:" + text);
    this.state.searchText = text;
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Pool Search"
        // breadcrumbs={[{ name: 'Home', active: true }]}
      >
{/* 
      <SearchBar getSearchText = {this.getSearchText}/> */}
      {/* <FetchPoolList searchText = {this.state.searchText}/> */}
      <FetchPoolList/>
      </Page>
    );
  }
}
export default DashboardPage;
