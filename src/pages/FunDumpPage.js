import Page from 'components/Page';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png';
import PoolPmImage from 'assets/img/poolpm.png';
import AdaPoolImage from 'assets/img/adapools.png';
import CardanoImage from 'assets/img/cardanoIcon.png';

class FunDumpPage extends React.Component {
  state = {
    funDumps: [],
    loading: true
  };

  constructor(props) {
    super(props);
  }

 async getFunDumps(){
    var u = 'https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17' + this.props.query;
    const response = await fetch(u);
    const data = await response.json();
    this.setState({ funDumps: data.poolpeek.funDumps, loading: false});
  }

  async componentDidMount() {
    window.scrollTo(0, 0);    
    this.getFunDumps();
  };

  render() {
      
    if (this.state.loading) {
      return <div>loading...</div>
    }


    return (

    
      <Page
        className="FunDumpPage"
        title={this.props.title}
      >

<div> 500 random small pools with less than 100 blocks and less than 10 million in active stake.<br/>
Click the navigation option again to pull a different set of 500 random pools.<br/>
We support the true decentralization of the Cardano network and believe small pools are a vital part of it.<br/><br/>
</div>
   {this.state.funDumps.map(function (item, i) { 
       return <div key={i}> <img src={CardanoImage} className="pr-2" width="28" height="25" />
      <a target="_blank" href={item.homepage}>{ReactHtmlParser(item.dump_text)}</a>
      <a href={"https://pool.pm/" + item.pool_id} target="_blank" rel="noreferrer"><img src={PoolPmImage} className="pr-2" title="pool.pm" /></a>
      <span>{item.location}</span>
      </div>
   })}<br/><br/>
      
      </Page>
    );
  }
}
export default FunDumpPage;
