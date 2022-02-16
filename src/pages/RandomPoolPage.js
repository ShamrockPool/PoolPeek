import Page from 'components/Page';
import React from 'react';
import {
  Card,
  CardBody,
  Col,
  Row,
  Button
} from 'reactstrap';
import PoolCard from 'components/Card/PoolCard';
import { baseUrlPoolPeekService, getPoolForSearchList, getPoolById } from 'assets/services';

class RandomPoolPage extends React.Component {
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

    poolsToDisplay = poolsToDisplay.sort(() => Math.random() - 0.5)

    this.setState({ poolData: poolsToDisplay, amountOfPools: poolsToDisplay.length, loading: false });
  }

  async reRoll() {
    var poolsToDisplay = this.state.poolData.sort(() => Math.random() - 0.5)

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
            <h5>Ever wanted to just find a random pool to delegate to...</h5>
          </Col>
        </Row>

        <Col style={{
          alignContent: 'center', justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Row style={{
            alignContent: 'center', justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}>
            {this.state.poolData.map(function (item, i) {
              return (
                i == 0 &&
                <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                  <div className='ProjectCards'>
                    <PoolCard
                      img={item.imageUrl}
                      pool={item} />
                  </div>
                </Col>
              )
            })}
          </Row>
          <Button variant="outline-light" size="sm" onClick={() => this.reRoll()}>Re Roll</Button>
        </Col>
      </Page>
    );
  }
}
export default RandomPoolPage;
