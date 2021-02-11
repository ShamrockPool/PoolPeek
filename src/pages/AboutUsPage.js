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
eye on their competiton. We offer a range or filters on ticker, name, descritpion, blocks, margin, pledge, cost and active stake.
<br/><br/>

PoolPeek.com was created by small stake pool owners who believe all pools should have a fighting chance. 
A random sort order is default for most lists at PoolPeek.com. The idea is that all pools get a random chance to be at 
the top of the list. An exception to this is the 'ticker' sort. Tickers sort alphabetically as you type. Tickers are meant 
to be unique and so it would make no sense to order them randomly. There are many great small pools out 
there that don't get a chance to showcase their pool because of some silly ranking algorithm. As we move forward we plan to write 
 tools that will help small pools advertise.
<br/><br/>

<b>The Developers</b>
<br/><br/>

PoolPeek.com is developed and maintained by small stake pool owners <a href="https://shamrock-pool.com/" target="_blank">SHA</a> and <a href="http://locoada.com" target="_blank">LOCO</a>
<br/><br/>

You can reach us on 
<br/><br/>

<b>Twitter: </b><a href="https://twitter.com/CardanoPoolPeek" target="_blank" rel="noreferrer">https://twitter.com/CardanoPoolPeek</a>
<br></br>
<b>Telegram group chat: </b><a href="https://t.me/poolpeek" target="_blank" rel="noreferrer">https://t.me/poolpeek</a>

<br/><br/>

<b>HOME</b>
<br/><br/>

HOME will randomly display all pools in our system that are not retiring or retired.
Click 'HOME' again anytime to randomly sort the results. After the pools display you can
refine the query using the basic or advanced filters and sorting
<br/><br/>


<b>Pool Queries</b>
<br/><br/>

Our text based pool queries look for keywords in the pool's meta data, the search is not exact and user is left to decide if 
the pool meets the actual criteria. This gives us the flexibility to filter pools in ways other sites can't.
If you believe a pool is missing from one of our Pool Queries or you have an idea for a new Pool Query, send us an email with the details.
<br/><br/>


<b>Fun Queries</b>
<br/><br/>

Fun queries allow you to display pools in a fun random way by ticker, name or description.
Just an interesting way for a potential delegator to maybe see something of interest and 
then click the pools website link or pool.pm link to find out more.
<br/><br/>


<a href="https://adafolio.com/" target="_blank"><b>adafolio.com</b></a> <b>Porfolios</b>
<br/><br/>

We worked with the Viper stake pool team to integrate adafolio.com portfolios into PoolPeek.com.
The list of portfolios and pools display in a random order and allow you browse and research the pools 
just as you would using a PoolPeek.com query.
<br/><br/>


<b>THANK YOU</b>
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
