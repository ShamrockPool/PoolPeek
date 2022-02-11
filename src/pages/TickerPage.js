import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { baseUrlPoolPeekService, getPoolForSearchList } from 'assets/services';

class TickerPage extends React.Component {
  state = {
    poolData: [],
    filteredPools: [],
    loading: true
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    this.getAllPools();
  };

  async getAllPools() {
    var response = await fetch(baseUrlPoolPeekService + getPoolForSearchList);
    var data = await response.json();
    this.setState({ poolData: data.pools, filteredPools: data.pools ,loading: false });
  }

  handleChange = (query) => (e) => {
    var input = e.target.value;
    var poolsToDisplay = this.state.filteredPools;

    poolsToDisplay = this.state.filteredPools.filter(pool => pool.ticker.toLowerCase() == (input.toLowerCase()));
    if (poolsToDisplay.length == 0) {
      poolsToDisplay = poolsToDisplay.concat(this.state.filteredPools.filter(pool => pool.ticker.toLowerCase().startsWith(input.toLowerCase())));
    }

    this.setState({ poolData: poolsToDisplay, searchInput: input });
  }

  render() {

    if (this.state.loading) {
      return <div>loading...</div>
    }


    return (


      <Page
        className="FunDumpPage"
        title={this.props.title}
      >

        <div>
          <Input
            style={{
              fontSize: 14, alignContent: 'center', justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
            type="text"
            className="cr-search-form__input"
            placeholder="Search with Ticker or Pool Name"
            onChange={this.handleChange()}
            value={this.state.searchInput}
          />

          <br />
        </div>
        <Row style={{
          alignContent: 'center', justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          {this.state.poolData.map(function (item, i) {
            return (
              <Col key={i} lg={1} md={4} sm={4} xs={6}>

                <Card>
                  <CardBody>
                    <Link to={`/pool/${item.pool_id}`}>
                      <h6>
                        <b>&nbsp;{item.ticker}</b>
                      </h6>
                    </Link>
                  </CardBody>
                </Card>

              </Col>
            )
          })}
        </Row>


      </Page>
    );
  }
}
export default TickerPage;
