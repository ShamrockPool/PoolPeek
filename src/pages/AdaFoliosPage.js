import FetchPoolList from 'components/pool/FetchPoolList';
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
    var title = "" + ReactHtmlParser(decodeURIComponent(query.substring(pos+7)));

    return (

      <Page
        className="AdaFoliosPage"
        title={title}
      >

      <div>
      <a href="https://adafolio.com" target="_blank">adafolio.com</a> is proudly made for the Cardano Community by the team at Viper Staking!<br/>
      Further the decentralization of Cardano by spreading out your delegation to multiple stake pools.<br/><br/>
      </div>

      <FetchPoolList query={query}/>
      </Page>
    );
  }
}
export default AdaFoliosPage;
