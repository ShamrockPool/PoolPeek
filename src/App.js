import * as queries from  './assets/queries/quickqueries';
import GAListener from 'components/GAListener';
import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
require('./styles/reduction.scss');

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const QuickQueriesPage = React.lazy(() => import('pages/QuickQueriesPage'));
const AdaFoliosPage = React.lazy(() => import('pages/AdaFoliosPage'));


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={DashboardPage} />
                <Route exact path="/baremetalpools" render={(props) => <QuickQueriesPage {...props} title="Bare Metal Pools" query={queries.baremetalquery} />}/>
                <Route exact path="/educationpools" render={(props) => <QuickQueriesPage {...props} title="Education Pools" query={queries.educationquery}/>}/>
                <Route exact path="/charitypools" render={(props) => <QuickQueriesPage {...props} title="Charity Pools" query={queries.charityquery}/>}/>
                <Route exact path="/womeninblockchainpools" render={(props) => <QuickQueriesPage {...props} title="Women In Blockchain Pools" query={queries.womeninblockchainquery}/>}/>
                <Route exact path="/zeroblockpools" render={(props) => <QuickQueriesPage {...props} title="Zero Block Pools" query={queries.zeroblockpoolsquery}/>}/>
                <Route exact path="/adafolio" render={(props) => <AdaFoliosPage {...props} key={Math.floor(Math.random() * 100) + Date.now()} title="adafolio Portfolio" query=""/>}/>
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
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

export default componentQueries(query)(App);
