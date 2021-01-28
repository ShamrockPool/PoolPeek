import SearchInput from 'components/SearchInput';
import SearchBar from 'components/SearchBar';
import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';

class DashboardPage extends React.Component {
  state = { searchText: "" }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getSearchText = async(text) => {
    console.log(text);
    this.state.searchText = text;
  }

  //pools are now passed from the app via props, app owns the pools and passes them around as needed
    
  render() {
    return (
      <Page
        className="DashboardPage"
        title="Home"
        // breadcrumbs={[{ name: 'Home', active: true }]}
      >

      <SearchBar getSearchText = {this.getSearchText}/>

      <FetchPoolList appPools={this.props.appPools} loading={this.props.loading}/>
      </Page>
    );
  }
}
export default DashboardPage;
