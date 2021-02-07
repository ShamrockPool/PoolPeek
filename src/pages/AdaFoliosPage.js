import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

class AdaFoliosPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {

    var query = this.props.location.search.replace("?","&");
    var pos = query.indexOf("&qname=");
    var title = "adafolio.com - " + ReactHtmlParser(decodeURIComponent(query.substring(pos+7)));

    return (

      <Page
        className="AdaFoliosPage"
        title={title}
      >
      <FetchPoolList query={query}/>
      </Page>
    );
  }
}
export default AdaFoliosPage;
