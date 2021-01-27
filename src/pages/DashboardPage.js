import SearchInput from 'components/SearchInput';
import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Home"
        // breadcrumbs={[{ name: 'Home', active: true }]}
      >

      <SearchInput />
      <FetchPoolList />
      </Page>
    );
  }
}
export default DashboardPage;
