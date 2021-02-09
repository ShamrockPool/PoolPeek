import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';
import CardanoImage from 'assets/img/cardanoIcon.png';

class AboutUsPage extends React.Component {
  state = {
    loading: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
      
    return (

    
      <Page
        className="AboutUsPage"
        title={this.props.title}
      >
     <div>

Overview
<br/><br/>

PoolPeek.com is a "light-weight" Cardano stake pool explorer that analyzes the publicly available registration data and other data 
elements such as number of produced blocks and active stake. Delegators can use our powerful query features to narrow down lists of 
pools and then drill deeper on specific pools using our external links feature. Stake pool operators can use PoolPeek.com to keep an 
eye on their competiton. We offer a range or filters on blocks, margin, pledge, cost and active stake.
<br/><br/>


Randomness
<br/><br/>

PoolPeek was build by small stake pool owners who believe all small pools should have a fighting chance. 
The default sort on most lists at PoolPeek.com is random. The idea is that a pool or group gets a random chance to be at 
the top of a list. There are many great small pools out there that don't get a chance to showcase their pool because of some 
silly ranking algorithm. The one exception to this is the 'ticker' sort. Tickers alphabetically as you type. Tickers are meant 
to be unique so it would make no sense to  order them randomly.
<br/><br/>

todo...



     </div>
      </Page>
    );
  }
}
export default AboutUsPage;
