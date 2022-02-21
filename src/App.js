import * as queries from './assets/queries/quickqueries';
import GAListener from 'components/GAListener';
import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
// import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch, HashRouter } from 'react-router-dom';

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
import NamiJoinPool from 'pages/tools/NamiJoinPool';

import ISOPage from 'pages/isopages/ISOPage';

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
      <HashRouter basename={getBasename()}>
        <GAListener>
          <Switch>

          <Route exact path="/namiwalletconnect" render={(props) => <NamiJoinPool />} />

            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" render={(props) => <DashboardPage />} />
                <Route exact path="/teampeek" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="We are the Creators of PoolPeek.com and PoolPeek Mobile!" query={queries.poolpeekquery} multiPoolOperators={true} pageDescription={queries.dynamicduopoolsqueryDesc} />} />
                <Route exact path="/poolsearch" render={(props) => <PoolSearchPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} query={'&excluderetired=1'} multiPoolOperators={false}/>} />
                <Route exact path="/poolsearchmap" render={(props) => <PoolMapV3 {...props}/>} />

                <Route exact path="/epochcalendar" render={(props) => <EpochCalendar />} />
                <Route exact path="/stakingrewards" render={(props) => <StakingRewards />} />
                <Route exact path="/stakingcalculator" render={(props) => <StakingCalculator />} />
                <Route exact path="/aboutus" render={(props) => <AboutUsPage />} />

                <Route exact path="/poolpeekcoinpools" render={(props) => <PoolPeekCoinPoolsV2 {...props}/>} />
                <Route exact path="/sundaeiso" render={(props) => <SundaePools {...props}/>} />
                <Route exact path="/sundaeriso" render={(props) => <SundaePoolsReverse {...props}/>} />
                <Route exact path="/hoskypools" render={(props) => <HoskyPoolsV2 {...props}/>} />
                <Route exact path="/hoskyinupools" render={(props) => <HoskyInuPoolsV2 {...props}/>} />
                <Route exact path="/bisonpools" render={(props) => <BisonPoolsV2 {...props}/>} />
                <Route exact path="/ardanaiso" render={(props) => <ArdanaISOPools {...props}/>} />
                <Route exact path="/geniusyieldiso" render={(props) => <GeniusYieldISOPools {...props}/>} />
                <Route exact path="/anetabtciso" render={(props) => <AnetaBtcISOPools {...props}/>} />
                <Route exact path="/flicktoiso" render={(props) => <FlicktoISOPools {...props}/>} />
                 
                <Route exact path="/isos" render={(props) => <ISOPage {...props}/>} />
                
                <Route exact path="/saturatedpools" render={(props) => <SaturatedPools {...props}/>} />
                <Route exact path="/retiredpools" render={(props) => <RetiredPoolsV2 {...props}/>} />
                {/* <Route exact path="/retiredpoolsv2" render={(props) => <RetiredPoolsV2 {...props}/>} /> */}
                
                

                <Route exact path="/baremetalpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Bare Metal" query={queries.baremetalquery} multiPoolOperators={true} pageDescription={queries.baremetalpoolsqueryDesc} />} />
                <Route exact path="/educationpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Education" query={queries.educationquery} multiPoolOperators={true} pageDescription={queries.educationpoolsqueryDesc} />} />
                <Route exact path="/charitypools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Charity" query={queries.charityquery} multiPoolOperators={true} pageDescription={queries.charitypoolsqueryDesc} />} />

                <Route exact path="/zeroblockpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Zero Block Small Pools" query={queries.zeroblockpoolsquery} multiPoolOperators={true} pageDescription={queries.zeroblockpoolsqueryDesc} />} />
                <Route exact path="/onetotenblockpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="One to Ten Block Small Pools" query={queries.onetotenpoolsquery} multiPoolOperators={true} pageDescription={queries.onetotenblockpoolsqueryDesc} />} />
                <Route exact path="/likelytoproduceblocks" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Small Pools Likely to Produce Blocks" query={queries.smallproduceblocksquery} multiPoolOperators={true} pageDescription={queries.smallproduceblocksDesc} />} />

                {/* <Route exact path="/retiringpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Soon Retiring" query={queries.retiringpoolsquery} multiPoolOperators={false} pageDescription={queries.soonretiringpoolsqueryDesc} />} />
                <Route exact path="/retiredpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Retired" query={queries.retiredpoolsquery} multiPoolOperators={false} pageDescription={queries.retiredpoolsqueryDesc} />} /> */}
                {/* <Route exact path="/marchsaturatedpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="March Saturated" query={queries.marchsaturatedpoolsquery}  multiPoolOperators={false}  pageDescription={queries.marchsaturatedpoolsqueryDesc} />} /> */}

                <Route exact path="/adafolio" render={(props) => <AdaFoliosPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="adafolio Portfolio" query="" />} />

                <Route exact path="/tickers" render={(props) => <TickerPage {...props} title="Pool Tickers" query={"tickers"} />} />
                <Route exact path="/zeroblocks" render={(props) => <ZeroBlocksPage {...props} title="Zero Blocks Pools" query={"zeroblocks"} />} />
                <Route exact path="/randompool" render={(props) => <RandomPoolPage {...props} title="Random Pools" query={"randompool"} />} />
                
                {/* <Route exact path="/fabulousnames" render={(props) => <FunDumpPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Fabulous Names" query={queries.funnamesquery} />} />
                <Route exact path="/fabulousdescriptions" render={(props) => <FunDumpPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Fabulous Descriptions" query={queries.fundescriptionsquery} />} /> */}

                <Route exact path="/twitterpools" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="Small Pools w/Twitter Handles" query={queries.twitterpoolsquery} multiPoolOperators={true} pageDescription={queries.twitterpoolsqueryDesc} />} />

                <Route exact path="/64milorgreater" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="64M or greater represent pools that are saturated and are incurring a rewards penalty." query={queries.qry64milorgreater} multiPoolOperators={false}  pageDescription={queries.desc64milorgreater}  />} />
                <Route exact path="/32milto64mil" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="32M to < 64M" query={queries.qry32milto64mil} multiPoolOperators={false}  pageDescription={queries.desc32milto64mil}  />} />
                <Route exact path="/16milto32mil" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="16M to < 32M" query={queries.qry16milto32mil} multiPoolOperators={false}  pageDescription={queries.desc16milto32mil}  />} />
                <Route exact path="/8milto16mil" render={(props) => <QuickQueriesPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="8M to < 16M" query={queries.qry8milto16mil} multiPoolOperators={false}  pageDescription={queries.desc8milto16mil}  />} />

                <Route exact path="/pool/:poolid" render={(props) => <PoolDetailsPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} query={'&excluderetired=1'} multiPoolOperators={false} />} />
                <Route exact path="/poolsearch/:location" render={(props) => <PoolSearchPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} query={'&excluderetired=1'} multiPoolOperators={false} />} />
                <Route exact path="/stakingrewards/:stakeAddress" render={(props) => <StakingRewards  {...props}/>} />

              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>

        </GAListener>
      </HashRouter>
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

