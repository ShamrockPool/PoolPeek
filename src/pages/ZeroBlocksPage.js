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

class ZeroBlocksPage extends React.Component {
  state = {
    poolData: [],
    filteredPools: [],
    amountOfPools: 0,
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
    var poolsToDisplay = data.pools.filter(pool => Number(pool.blocks) == 0 && Number(pool.live_stake) > 25);
    this.setState({ poolData: poolsToDisplay, amountOfPools: poolsToDisplay.length, loading: false });
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

        <Row style={{
          alignContent: 'center', justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Col>
          <h5>The below {this.state.amountOfPools} pools that have not produced a block.</h5>
          <h6>We would love for people to stake/bootstrap these pools to promote decentralization.</h6>
          </Col>
        </Row>

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
export default ZeroBlocksPage;
