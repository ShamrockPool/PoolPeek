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

<b>Overview</b>
<br/><br/>

PoolPeek.com is a "light-weight" Cardano stake pool explorer that analyzes the publicly available registration data and other data 
elements such as number of produced blocks and active stake. Delegators can use our powerful query features to narrow down lists of 
pools and then drill deeper on specific pools using our external links feature. Stake pool operators can use PoolPeek.com to keep an 
eye on their competiton. We offer a range or filters on blocks, margin, pledge, cost and active stake.
<br/><br/>

<b>The Developers</b>
<br/><br/>

PoolPeek.com is developed and maintained by small pool owners SHA and LOCO...
<br></br>
You can reach us on 
<br></br>
<b>Twitter: </b><a href="https://twitter.com/CardanoPoolPeek" target="_blank" rel="noreferrer">https://twitter.com/CardanoPoolPeek</a>
<br></br>
<b>Telegram group chat: </b><a href="https://t.me/poolpeek" target="_blank" rel="noreferrer">https://t.me/poolpeek</a>

<br/><br/>

PoolPeek was built by small stake pool owners who believe all small pools should have a fighting chance. 
The default sort on most lists at PoolPeek.com is random. The idea is that a pool or group gets a random chance to be at 
the top of a list. There are many great small pools out there that don't get a chance to showcase their pool because of some 
silly ranking algorithm. The one exception to this is the 'ticker' sort. Tickers sort alphabetically as you type. Tickers are meant 
to be unique so it would make no sense to  order them randomly.
<br/><br/>


<b>HOME</b>
<br/><br/>

HOME will randomly display all pools in our system that are not retiring or retired.
Click 'HOME' again to randomly re-order the results. After the pools display you can
refine the query using the basic or advanced filters and sorting
<br/><br/>


<b>Pool Queries</b>
<br/><br/>

Our text based queries look for keywords in the pool's meta data, the search is not exact and user is left to decide if the pool meets the actual criteria. This gives us the flexibility to filter pools in ways other sites can't.
If you believe a pool is missing from one of our Pool Queries, send us an email with the details and we will manually include it.
If you have an idea for a new 'Pool Query' send us an email with the details.
<br/><br/>


<b>Fun Queries</b>
<br/><br/>

Allows the user to display pools randomly by ticker, name or description.
Just a fun way for a potential delegator to maybe see something of interest and then click the pools website link or pool.pm link to find out more.
<br/><br/>


<b>adafolio Porfolios</b>
<br/><br/>

We worked with the Viper team to integrate adafolio.com portfolios into pool peek.
The list of protfolois loads in random order and then each pool in the list...
<br/><br/>


THANK YOU
<br/><br/>

PoolPeek.com would like to thank the following sites for supplying us tools to make our site even better:
<br/>
<ul>
<li><a href="Pool.pm" target="_blank">Pool.pm</a></li>
<li><a href="adafolio.com" target="_blank">adafolio.com</a></li>
<li><a href="adapools.org" target="_blank">adapools.org</a></li>
<li><a href="pooltool.io" target="_blank">pooltool.io</a></li>
</ul>


     </div>
      </Page>
    );
  }
}
export default AboutUsPage;
