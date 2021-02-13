import FetchPoolList from 'components/FetchPoolList';
import Page from 'components/Page';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png';
import PoolPmImage from 'assets/img/poolpm.png';
import AdaPoolImage from 'assets/img/adapools.png';
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

<b>A different kind of Cardano Stake Pool Explorer</b>
<br/><br/>

PoolPeek.com is a Cardano stake pool explorer that analyzes the publicly available registration data and other data 
elements such as number of produced blocks and active stake. Delegators can use our powerful query features to narrow down lists of 
pools and then drill deeper using our external links feature. Stake pool operators can use PoolPeek.com to keep an 
eye on their competiton. We offer a range or filters on ticker, name, descritpion, blocks, margin, pledge, cost and active stake.
<br/><br/>

PoolPeek.com was created by small stake pool owners who believe all pools should have a fighting chance. 
A random sort order is default for most lists at PoolPeek.com. The idea is that all pools get a random chance to be at 
the top of the list. An exception to this is the 'ticker' sort. Tickers sort alphabetically as you type. 
There are many great small pools out there that don't get a chance to showcase their pool because of some silly ranking algorithm. 
As we move forward we plan to write tools that will help small pools advertise.
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

We have devoted many hours developing and maintaining PoolPeek.com, If you like what you see and want to support our efforts, 
please consider tipping us:
<br/><br/>

LOCO:<br/>
addr1q9z0fjsenn4ne6zjswl3r3k98uuehe7ve7e8649kjsy5yg33myr8mpq6wk3nmqw2hg8v5a6kmlpmk889ye20qussqekslteph6
<br/><br/>

SHA:<br/>
addr1q8ds9zyklmzphd6us528kqlcjmhq874ase5tk8qfc7a7p5fxh64unn46g3scmqzdym6epgkmmzv9uzvymqgdndtwh2psmwddeg
<br/><br/>

<b>HOME</b>
<br/><br/>

HOME randomly displays all pools in our system that are not retiring or retired.
You can click the 'HOME' option again anytime to re-order the list. 
After the pools display you can page through the results and refine the query using the basic or advanced filters and sorting.
<br/><br/>


<b>Pool Queries</b>
<br/><br/>

Our text based pool queries look for keywords in the pool's data, the search is not exact and user is left to decide if 
the pool meets the actual criteria. This gives us the flexibility to filter pools in ways other sites can't.
If you believe a pool is missing from one of our Pool Queries or you have an idea for a new Pool Query, please contact us.
<br/><br/>


<b>Fabulous 500</b>
<br/><br/>

500 random small pools with less than 100 blocks and less than 10 million in active stake.
Click the navigation option again to pull a different set of 500 random pools.
We support the true decentralization of the Cardano network and believe small pools are a vital part of it.
Fabulous 500 allow you to display pools in a fun random way by ticker, name or description.
Just an interesting way for a potential delegator to maybe see something of interest and 
then click the pools website link or pool.pm link to find out more.
<br/><br/>


<a href="https://adafolio.com/" target="_blank"><b>adafolio.com</b></a> <b>Porfolios</b>
<br/><br/>

adafolio.com is proudly made for the Cardano Community by the team at Viper Staking!<br/>
We worked with the Viper team to integrate adafolio.com portfolios into PoolPeek.com.<br/>
The list of portfolios and pools display in a random order and allow you browse and research the pools 
just as you would using any other PoolPeek.com query.<br/>
 Further the decentralization of Cardano by spreading out your delegation to multiple stake pools.
<br/><br/>


<b>The Old Site</b>
<br/><br/>

You can still access the "classic" version of PoolPeek.com using the link below:
<br/><br/>

<a target="_blank" href="https://PoolPeek.com/PoolPeekClassic.asp">Pool Peek Classic</a>
<br/>
https://PoolPeek.com/PoolPeekClassic.asp
<br/><br/>


<b>THANK YOU</b>
<br/><br/>

PoolPeek.com would like to thank the following sites for supplying us tools that make our site even better:
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
