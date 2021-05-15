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
          <br /><br />

PoolPeek.com is a Cardano stake pool explorer that analyzes the publicly available registration data and other data
elements such as number of produced blocks and active stake. Delegators can use our powerful query features to narrow down lists of
pools and then drill deeper using our external links feature. Stake pool operators can use PoolPeek.com to keep an
eye on their competition. We offer a range or filters on ticker, name, description, blocks, margin, pledge, cost and active stake.
<br /><br />

PoolPeek.com was created by small stake pool owners who believe all pools should have a fighting chance.
A random sort order is default for most lists at PoolPeek.com. The idea is that all pools get a random chance to be at
the top of the list. An exception to this is the 'ticker' sort. Tickers sort alphabetically as you type.
There are many great small pools out there that don't get a chance to showcase their pool because of some silly ranking algorithm.
As we move forward we plan to write tools that will help small pools advertise.
<br /><br />

          <b>The Developers</b>
          <br /><br />

PoolPeek.com is developed and maintained by small stake pool owners <a href="https://shamrock-pool.com/" target="_blank">SHA</a>, <a href="https://m1crypto.co/home">EAGLE</a>

          <br /><br />

You can reach us on
<br /><br />

          <b>Twitter: </b><a href="https://twitter.com/CardanoPoolPeek" target="_blank" rel="noreferrer">https://twitter.com/CardanoPoolPeek</a>
          <br></br>
          <b>Telegram group chat: </b><a href="https://t.me/poolpeek" target="_blank" rel="noreferrer">https://t.me/poolpeek</a>
          <br /><br />

We have devoted many hours developing and maintaining PoolPeek.com, If you like what you see and want to support our efforts,
please consider tipping us:
<br /><br />

          <a href={"https://poolpeek.com/pool/BE7E2461A584B6532C972EDCA711FA466D7D0E8A86B6629FC0784FF6"}
            target="_blank" rel="noreferrer"><p>SHA:</p></a>
addr1q8ds9zyklmzphd6us528kqlcjmhq874ase5tk8qfc7a7p5fxh64unn46g3scmqzdym6epgkmmzv9uzvymqgdndtwh2psmwddeg
<br /><br />

<a href={"https://poolpeek.com/pool/2cdc5cef88f1c15e19c33fd8f47d9bd89c3d7ee4fa09512fbd44a126"}
            target="_blank" rel="noreferrer"><p>EAGLE:</p></a>
addr1qxmmr5crp2929u64z8pzxjsdca7u6p6d80spdvzg0h8wz4qryl3a8chygwx7jykj6fmhd4q46s5qeuet9f4ku03krwmq8u2nvx
<br /><br />

          <b>Pool Search</b>
          <br /><br />

Pool Search randomly displays all pools in our system that are not retiring or retired.
The order of the pools is updated daily with small pools taking priority. New pools added throughout the day will 
be placed at the top of the list. After the pools display you can page through the results and refine the query using the basic or advanced filters and sorting.
<br /><br />

<b>Map Search</b>
<br /><br />

Map Search displays active stake pools on a map. The coordinates of a pool is based on the pool's extented meta data 'location' field.
If our geo service finds exactly one match for the pool's location, we count it as a hit and display it on the map. 
You can then click the marker to drill down and see all pools at that location.
<br /><br />


          <b>Pool Queries</b>
          <br /><br />

Our text based pool queries look for keywords in the pool's data, the search is not exact and user is left to decide if
the pool meets the actual criteria. This gives us the flexibility to filter pools in ways other sites can't.
If you believe a pool is missing from one of our Pool Queries or you have an idea for a new Pool Query, please contact us.
<br /><br />


          <b>Fabulous 500</b>
          <br /><br />

500 random small pools with less than 100 blocks and less than 10 million in active stake.
Click the navigation option again to pull a different set of 500 random pools.
We support the true decentralization of the Cardano network and believe small pools are a vital part of it.
Fabulous 500 allow you to display pools in a fun random way by ticker, name or description.
Just an interesting way for a potential delegator to maybe see something of interest and
then click the pools website link or pool.pm link to find out more.
<br /><br />


          <a href="https://adafolio.com/" target="_blank"><b>adafolio.com</b></a> <b>Porfolios</b>
          <br /><br />

adafolio.com is proudly made for the Cardano Community by the team at Viper Staking!<br />
We worked with the Viper team to integrate adafolio.com portfolios into PoolPeek.com.<br />
The list of portfolios and pools display in a random order and allow you browse and research the pools
just as you would using any other PoolPeek.com query.<br />
 Further the decentralization of Cardano by spreading out your delegation to multiple stake pools.
<br /><br />

<b>Delistment of Pools via SMASH</b>
<br /><br />

Badly behaved stake pools can be delisted from display in Daedalus. Factors taken into account for such decisions 
include illegal or malicious metadata content, impersonation, the use of ticker names that were previously 
registered on the Incentivized Testnet (when this is not the same stake pool/operator), 
intellectual property rights violations, or stake pools that are no longer active. 
If a pool is delisted in Daedalus we also delist it in Pool Peek.
<br/><br/>


<b>THANK YOU</b>
<br /><br />

PoolPeek.com would like to thank the following sites for supplying us tools that make our site even better:
<br />
          <ul>
            <li><a href="Pool.pm" target="_blank">Pool.pm</a></li>
            <li><a href="adafolio.com" target="_blank">adafolio.com</a></li>
            <li><a href="adapools.org" target="_blank">adapools.org</a></li>
            <li><a href="pooltool.io" target="_blank">pooltool.io</a></li>
          </ul>

<br/>

<h2>Third Party Links Disclaimer</h2>

Third party links to sites and images on our website are provided for visitors’ convenience only. PoolPeek.com accepts no liability for any content on 
the linked sites, or the site itself and links taken to other sites are done so at your own risk. 
<br/><br/>

PoolPeek.com does it upmost to link to reputable websites but ultimately has no control over content on these.
<br/><br/>

PoolPeek.com does not imply that any third party links or images used on our website are endorsed by us, and we accept no responsibility for the 
content or the use of such websites. PoolPeek.com does not give any representation regarding the quality, safety, 
suitability or reliability of any external website or any of the content or materials contained on them. We urge users to take adequate 
steps to safeguard against such things like viruses, worms and other potentially harmful malware.
<br/><br/>

When using the third party links on PoolPeek.com's website, please remember you should review the privacy policies of those websites and 
the terms and conditions to get a better understanding of what, why and how they collect and use any personally identifiable information.
<br/><br/>

Hyperlinks, images and hypertext are provided for your ease, so you can access the variety of information and services provided. 
We accept no liability arising out of the use of such links, including:
<br/><br/>

misuse or misunderstanding of these hyperlinks and hypertext links and web site navigational methods<br/>
third party interpretation of data or information which is distributed around the web site and reached using hypertext and hyperlinks<br/>
third party understanding of or use of the navigational structure of the site or the interpretation of distributed information on the site<br/>
We may revise this disclaimer at any time, without prior notice, by updating this web page.
<br/><br/>


<h2>PoolPeek.com Website Privacy Statement</h2>
 
          <b> ACKNOWLEDGEMENT AND ACCEPTANCE OF TERMS</b>
          <br />
          <p>PoolPeek.com is committed to protecting your privacy. This Privacy Statement sets forth our current privacy practices with regard to the
          information we collect when you or your computer interact with our website.   By accessing PoolPeek.com, you acknowledge and fully
          understand PoolPeek.com Privacy Statement and freely consent to the information collection and use
practices described in this Website Privacy Statement.</p>


          <b> PARTICIPATING MERCHANT POLICIES</b>
          <br />
          <p>Related services and offerings with links from this website, including vendor sites, have their own privacy statements that can be viewed by
          clicking on the corresponding links within each respective website. Online merchants and others who participate in
          PoolPeek.com services are encouraged to participate in industry privacy initiatives and to take a responsible attitude towards consumer privacy.
          However, since we do not have direct control over the policies or practices of participating merchants and other third parties,
          we are not responsible for the privacy practices or contents of those sites.  We recommend and encourage that you always review the privacy
policies of merchants and other third parties before you provide any personal information or complete any transaction with such parties.</p>

          <b> INFORMATION WE COLLECT AND HOW WE USE IT</b>

          <p>PoolPeek.com collects certain information from and about its users three ways: directly from our Web Server logs, the user, and with Cookies.</p>

          <b> Web Server Logs.</b>
          <br /><p>When you visit our Website, we may track information to administer the site and analyze its usage. Examples of information we may
track include: </p>
 Your Internet protocol address. <br />
 The kind of browser or computer you use. <br />
 Number of links you click within the site. <br />
 State or country from which you accessed the site. <br />
 Date and time of your visit. <br />
 Name of your Internet service provider. <br />
 Web page you linked to our site from. <br />
 Pages you viewed on the site. <br />
          <br />

          <b> Use of Cookies</b>
          <br />
          <p>PoolPeek.com may use cookies to personalize or enhance your user experience.  A cookie is a small text file that is placed
          on your hard disk by a Web page server.  Cookies cannot be used to run programs or deliver viruses to your computer.
Cookies are uniquely assigned to you, and can only be read by a Web Server in the domain that issued the cookie to you. </p>

          <p>One of the primary purposes of cookies is to provide a convenience feature to save you time.  For example, if you
          personalize a web page, or navigate within a site, a cookie helps the site to recall your specific information on
          subsequent visits.  Hence, this simplifies the process of delivering relevant content and eases site
navigation by providing and saving your preferences and login information as well as providing personalized functionality. </p>

          <p>You have the ability to accept or decline cookies.  Most Web browsers automatically accept cookies, but you can usually
          modify your browser setting to decline cookies. If you reject cookies by changing your browser settings then be aware that this may
disable some of the functionality on our Website.</p>

          <b> Personal Information Users</b>
          <br />

          <p>We will not disclose personally identifiable information we collect from you to third parties without your permission except to
the extent necessary including:</p>

To fulfill your service requests for services <br />
To protect ourselves from liability <br />
To respond to legal process or comply with law<br />
          <br />

          <b> CHANGES TO THIS STATEMENT</b>
          <br />
          <p>PoolPeek.com has the discretion to occasionally update this privacy statement.
          We may revise this privacy statement at any time, without prior notice, by updating this web page.
          We encourage you to periodically review this privacy statement to stay informed about how we are helping to protect
          the personal information we collect.  Your continued use of the service constitutes your agreement to
this privacy statement and any updates.</p>

          <b> CONTACTING US</b>
          <br />
          <p>If you have questions regarding our Privacy Statement, its implementation, failure to adhere to
          this Privacy Statement and/or our general practices, please contact us at
          CardanoPoolPeek@gmail.com We will use commercially reasonable efforts to promptly
respond and resolve any problem or question.</p>


        </div>
      </Page>
    );
  }
}
export default AboutUsPage;
