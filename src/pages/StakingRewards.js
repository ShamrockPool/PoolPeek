
import Page from 'components/Page';
import React from 'react';
import { Input, Pagination, PaginationItem, PaginationLink, Table, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { isEmpty } from 'utils/stringutil.js';
import StakingRewardsList from 'components/StakingRewardsList';

const cardheaderStyle = {
  // borderBottom:  'solid 1px',
  borderTop: 'solid 3px green',
  borderRight: 'solid 3px green',
  borderLeft: 'solid 3px green',
  // background: 'green',
  // color: 'white',
  paddingBottom: 0
};

const cardBodyStyle = {
  borderBottom: 'solid 3px green',
  borderTop: 'solid 3px green',
  borderRight: 'solid 3px green',
  borderLeft: 'solid 3px green',
  // background: 'green',
  // color: 'white',
  paddingBottom: 0,
  paddingTop: 5,
  paddingLeft: 10,
  paddingRight: 10
};


class StakingRewards extends React.Component {
  state = {
    loading: true,
    stakingAddress: null,
    stakingRewardsList: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.setState({ loading: false });
  }

  handleChange = (query) => (e) => {
    this.setState({ stakingAddress: e.target.value });
  }

  async getStakingRewards() {
    if (!isEmpty(this.state.stakingAddress)) {
      const response = await fetch('https://smashpeek.com/services/rewards/stakeaddress/' + this.state.stakingAddress);
      const data = await response.json();
      console.log(data);
      this.setState({ stakingRewardsList: data });
      return data;
    }
  }

  render() {

    return (
      <Page
        className="StakingRewardsPage"
        title={this.props.title}
      >
        <div style={{ width: "100%", alignItems: "left" }}>
        <Card style={cardBodyStyle} body>
          <Input
            style={{ fontSize: 14 }}
            type="text"
            className="cr-search-form__input"
            placeholder="Enter Stake Address."
            onChange={this.handleChange()}
          />
          <Button color="primary" onClick={() => { this.getStakingRewards() }}>Submit</Button>

          {this.state.stakingRewardsList != null &&
            <div style={{ width: "100%", alignItems: "left" }}>

                  <Table {...{ ['striped']: true }}>
                    <thead>
                      <tr>
                        <th>Epoch</th>
                        <th>Pool</th>
                        <th>Reward</th>
                        <th>Reward_Date</th>
                        <th>Paid_Date</th>
                      </tr>
                    </thead>
                    <StakingRewardsList stakingRewardsList={this.state.stakingRewardsList} />
                  </Table>              
            </div >
          }
          </Card>
        </div>
      </Page>
    );
  }
}
export default StakingRewards;
