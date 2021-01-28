import GAListener from 'components/GAListener';
import { MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
// import './styles/reduction.scss';
// import style from './styles/reduction.scss'

require('./styles/reduction.scss');

const ButtonPage = React.lazy(() => import('pages/ButtonPage'));
const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const TablePage = React.lazy(() => import('pages/TablePage'));


const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};


class App extends React.Component {
  state = {
        loading: true,
        pools: null
    }

  async componentDidMount() {  
    const url = "http://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&page=1";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ pools: data.poolpeek.pools, loading: false })
    //alert(this.state.pools);

  }

  render() {
    return (
    
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path='/' render={() => <DashboardPage appPools={this.state.pools} loading={this.state.loading}/>}/>
                <Route exact path="/buttons" component={ButtonPage} />
                <Route exact path="/tables" component={TablePage} />
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
