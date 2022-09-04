import * as queries from './assets/queries/quickqueries';
import GAListener from 'components/GAListener';
import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
// import componentQueries from 'react-component-queries';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardPage from 'pages/DashboardPage';
import PoolSearchPage from 'pages/PoolSearchPage';
import QuickQueriesPage from 'pages/QuickQueriesPage';
import AdaFoliosPage from 'pages/AdaFoliosPage';
import TickerPage from 'pages/TickerPage';
import AboutUsPage from 'pages/AboutUsPage';
import RandomPoolPage from 'pages/RandomPoolPage';
import EpochCalendar from 'pages/EpochCalendar';
import StakingRewards from 'pages/StakingRewards';
import PoolDetailsPage from 'pages/PoolDetailsPage';
import StakingCalculator from 'pages/StakingCalculator';
import ZeroBlocksPage from 'pages/ZeroBlocksPage';
import SundaePools from './pages/isopages/SundaePools';
import SundaePoolsReverse from 'pages/isopages/SundaePoolsReverse';
import HoskyPoolsV2 from 'pages/isopages/HoskyPoolsV2';
import HoskyInuPoolsV2 from 'pages/isopages/HoskyInuPoolsV2';
import SaturatedPools from 'pages/SaturatedPools';
import GeniusYieldISOPools from 'pages/isopages/GeniusYieldISOPools';
import PoolPeekCoinPoolsV2 from 'pages/isopages/PoolPeekCoinPoolsV2';
import AnetaBtcISOPools from 'pages/isopages/AnetaBtcISOPools';
import FlicktoISOPools from 'pages/isopages/FlicktoISOPools';
import BisonPoolsV2 from 'pages/isopages/BisonPoolsV2';
import ArdanaISOPools from 'pages/isopages/ArdanaISOPools';
import RetiredPoolsV2 from 'pages/RetiredPoolsV2';
import PoolMapV3 from 'pages/PoolMapV3';
import JoinPoolEmbed from 'pages/joinpool/JoinPoolEmbed';
import MyWalletPage from 'pages/MyWalletPage';
import FlacISOPools from 'pages/isopages/FlacISOPools';

import ISOPage from 'pages/isopages/ISOPage';

import AlliancesPage from 'pages/alliancepages/AlliancesPage';
import AllianceDetailsPage from 'pages/alliancepages/AllianceDetailsPage';

import BlocksPage from 'pages/BlocksPage';
import BlocksListPage from 'pages/BlocksListPage';

import GA4React from "ga-4-react";
const ga4react = new GA4React("UA-201777163-1");
ga4react.initialize();

require('./styles/reduction.scss');

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

export default class App extends React.Component {

  render() {
    console.log("props = " + this.props);
    return (
      <Router>
        <GAListener>
          <MainLayout breakpoint={this.props.breakpoint}>
            <Routes>
              <Route exact path="/" element={<DashboardPage />} />
              <Route exact path="/joinpool/:name/:poolid" element={<JoinPoolEmbed props />} />

              <Route exact path="/wallet" element={<MyWalletPage props />} />
              <Route exact path="/wallet/:lookupid" element={<MyWalletPage props />} />

              <Route exact path="/blocks" element={<BlocksListPage props />} />

              <Route exact path="/teampeek" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="We are the Creators of PoolPeek.com and PoolPeek Mobile!" query={queries.poolpeekquery} multiPoolOperators={true} pageDescription={queries.dynamicduopoolsqueryDesc} />} />
              <Route exact path="/poolsearch" element={<PoolSearchPage props key={Math.floor(Math.random() * 100) + Date.now()} query={'&excluderetired=1'} multiPoolOperators={false} />} />
              <Route exact path="/poolsearchmap" element={<PoolMapV3 props />} />

              <Route exact path="/epochcalendar" element={<EpochCalendar />} />
              <Route exact path="/stakingrewards" element={<StakingRewards />} />
              <Route exact path="/stakingcalculator" element={<StakingCalculator />} />
              <Route exact path="/aboutus" element={<AboutUsPage />} />

              <Route exact path="/poolpeekcoinpools" element={<PoolPeekCoinPoolsV2 props />} />
              <Route exact path="/sundaeiso" element={<SundaePools props />} />
              <Route exact path="/sundaeriso" element={<SundaePoolsReverse props />} />
              <Route exact path="/hoskypools" element={<HoskyPoolsV2 props />} />
              <Route exact path="/hoskyinupools" element={<HoskyInuPoolsV2 props />} />
              <Route exact path="/bisonpools" element={<BisonPoolsV2 props />} />
              <Route exact path="/ardanaiso" element={<ArdanaISOPools props />} />
              <Route exact path="/geniusyieldiso" element={<GeniusYieldISOPools props />} />
              <Route exact path="/anetabtciso" element={<AnetaBtcISOPools props />} />
              <Route exact path="/flicktoiso" element={<FlicktoISOPools props />} />
              <Route exact path="/flaciso" element={<FlacISOPools props />} />


              <Route exact path="/isos" element={<ISOPage props />} />

              <Route exact path="/saturatedpools" element={<SaturatedPools props />} />
              <Route exact path="/retiredpools" element={<RetiredPoolsV2 props />} />

              <Route exact path="/alliances" element={<AlliancesPage props />} />
              <Route exact path="/alliances/xspo" element={<AllianceDetailsPage props title="XSPO Alliance" alliancename="xspo" url="https://raw.githubusercontent.com/xSPO-Alliance/adapools-xspo-alliance/main/xspo-alliance-members.json" />} />
              <Route exact path="/alliances/cspa" element={<AllianceDetailsPage props title="CSPA Alliance" alliancename="cspa" url="https://raw.githubusercontent.com/SinglePoolAlliance/Registration/master/adapools.json" />} />
              <Route exact path="/alliances/mdp" element={<AllianceDetailsPage props title="MDP Alliance" alliancename="mdp" url="https://raw.githubusercontent.com/CardanoMDP/CardanoMDP-adapools-org-alliance/main/cardano-mdp.json" />} />
              <Route exact path="/alliances/armada" element={<AllianceDetailsPage props title="Armada Alliance" alliancename="armada" url="https://raw.githubusercontent.com/armada-alliance/armada-alliance/main/adapools.json" />} />


              <Route exact path="/baremetalpools" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Bare Metal" query={queries.baremetalquery} multiPoolOperators={true} pageDescription={queries.baremetalpoolsqueryDesc} />} />
              <Route exact path="/educationpools" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Education" query={queries.educationquery} multiPoolOperators={true} pageDescription={queries.educationpoolsqueryDesc} />} />
              <Route exact path="/charitypools" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Charity" query={queries.charityquery} multiPoolOperators={true} pageDescription={queries.charitypoolsqueryDesc} />} />

              <Route exact path="/zeroblockpools" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Zero Block Small Pools" query={queries.zeroblockpoolsquery} multiPoolOperators={true} pageDescription={queries.zeroblockpoolsqueryDesc} />} />
              <Route exact path="/onetotenblockpools" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="One to Ten Block Small Pools" query={queries.onetotenpoolsquery} multiPoolOperators={true} pageDescription={queries.onetotenblockpoolsqueryDesc} />} />
              <Route exact path="/likelytoproduceblocks" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Small Pools Likely to Produce Blocks" query={queries.smallproduceblocksquery} multiPoolOperators={true} pageDescription={queries.smallproduceblocksDesc} />} />

              {/* <Route exact path="/retiringpools" render={ <QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Soon Retiring" query={queries.retiringpoolsquery} multiPoolOperators={false} pageDescription={queries.soonretiringpoolsqueryDesc} />} />
                <Route exact path="/retiredpools" render={ <QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Retired" query={queries.retiredpoolsquery} multiPoolOperators={false} pageDescription={queries.retiredpoolsqueryDesc} />} /> */}
              {/* <Route exact path="/marchsaturatedpools" render={ <QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="March Saturated" query={queries.marchsaturatedpoolsquery}  multiPoolOperators={false}  pageDescription={queries.marchsaturatedpoolsqueryDesc} />} /> */}

              <Route exact path="/adafolio" element={<AdaFoliosPage props key={Math.floor(Math.random() * 100) + Date.now()} title="adafolio Portfolio" query="" />} />

              <Route exact path="/tickers" element={<TickerPage props title="Pool Tickers" query={"tickers"} />} />
              <Route exact path="/zeroblocks" element={<ZeroBlocksPage props title="Zero Blocks Pools" query={"zeroblocks"} />} />
              <Route exact path="/randompool" element={<RandomPoolPage props title="Random Pools" query={"randompool"} />} />

              {/* <Route exact path="/liveblocks" render={ <BlocksPage props title="Live Blocks" />} /> */}

              {/* <Route exact path="/fabulousnames" render={ <FunDumpPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Fabulous Names" query={queries.funnamesquery} />} />
                <Route exact path="/fabulousdescriptions" render={ <FunDumpPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Fabulous Descriptions" query={queries.fundescriptionsquery} />} /> */}

              <Route exact path="/twitterpools" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="Small Pools w/Twitter Handles" query={queries.twitterpoolsquery} multiPoolOperators={true} pageDescription={queries.twitterpoolsqueryDesc} />} />

              <Route exact path="/64milorgreater" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="64M or greater represent pools that are saturated and are incurring a rewards penalty." query={queries.qry64milorgreater} multiPoolOperators={false} pageDescription={queries.desc64milorgreater} />} />
              <Route exact path="/32milto64mil" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="32M to < 64M" query={queries.qry32milto64mil} multiPoolOperators={false} pageDescription={queries.desc32milto64mil} />} />
              <Route exact path="/16milto32mil" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="16M to < 32M" query={queries.qry16milto32mil} multiPoolOperators={false} pageDescription={queries.desc16milto32mil} />} />
              <Route exact path="/8milto16mil" element={<QuickQueriesPage props key={Math.floor(Math.random() * 100) + Date.now()} title="8M to < 16M" query={queries.qry8milto16mil} multiPoolOperators={false} pageDescription={queries.desc8milto16mil} />} />

              <Route path="pool">
                <Route path=":poolid"
                  element={(
                    <PoolDetailsPage />
                  )} />
              </Route>

              <Route exact path="/poolsearch/:location" element={<PoolSearchPage props key={Math.floor(Math.random() * 100) + Date.now()} query={'&excluderetired=1'} multiPoolOperators={false} />} />
              <Route exact path="/stakingrewards/:stakeAddress" element={<StakingRewards props />} />
            </Routes>
          </MainLayout>
        </GAListener>
      </Router>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

