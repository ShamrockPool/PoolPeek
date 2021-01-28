import baremetalquery from './assets/queries/baremetalquery';
import educationquery from './assets/queries/educationquery';
import charityquery from './assets/queries/charityquery';

import GAListener from 'components/GAListener';
import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
require('./styles/reduction.scss');

const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const QuickQueriesPage = React.lazy(() => import('pages/QuickQueriesPage'));


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
                <Route exact path="/baremetalpools" render={(props) => <QuickQueriesPage {...props} title="Bare Metal Pools" query={baremetalquery} />}/>
                <Route exact path="/educationpools" render={(props) => <QuickQueriesPage {...props} title="Education Pools" query={educationquery}/>}/>
                <Route exact path="/charitypools" render={(props) => <QuickQueriesPage {...props} title="Charity Pools" query={charityquery}/>}/>


                {/* <Route exact path='/FileUpload' render={
                  (props) => <FileUpload {...props} acc={this.state.account} ethAdd={this.state.ethAddress} />
                } /> */}
                {/* <Route exact path="/tables" component={TablePage} /> */}
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
