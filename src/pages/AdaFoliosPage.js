import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';

class AdaFoliosPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {

    var query = this.props.location.search.replace("?","&");

    return (

      <Page
        className="AdaFoliosPage"
        title={this.props.title}
      >
      <FetchPoolList query={query}/>
      </Page>
    );
  }
}
export default AdaFoliosPage;
