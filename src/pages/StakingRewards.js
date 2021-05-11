
import Page from 'components/Page';
import React from 'react';
import { Input, Pagination, PaginationItem, PaginationLink, Table, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { isEmpty } from 'utils/stringutil.js';
import StakingRewardsList from 'components/StakingRewardsList';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

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

const tableRowStyle = {
  // borderBottom: 'solid 3px blue',
  // background: 'green',
  // color: 'white',
  fontWeight: 'bold',
  padding: 0,
  paddingBottom: 5
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

    if (!isEmpty(this.props.match)) {
      if (this.props.match.params.stakeAddress) {
        this.setState({ stakingAddress: this.props.match.params.stakeAddress });
        this.state.stakingAddress = this.props.match.params.stakeAddress;
        this.getStakingRewards();
      }
    }
  }

  handleChange = (query) => (e) => {
    this.setState({ stakingAddress: e.target.value });
  }

  exportToCSV(apiData, fileName) {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  async getStakingRewards() {
    if (!isEmpty(this.state.stakingAddress)) {
      const response = await fetch('https://smashpeek.com/services/rewards/stakeaddress/' + this.state.stakingAddress);
      const data = await response.json();
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
            <h4><b>Staking rewards</b></h4>
            <h7>Staking rewards are earnings you receive for staking your ADA to a pool.</h7>
            <h7>This tool is here to help you track your staking rewards from each Epoch.</h7>
            <br></br>
            <h7>Register with our Staking Rewards <a href={"http://t.me/poolpeek_bot"} target="_blank" rel="noreferrer">Telegram BOT!!</a></h7>

            <br></br>

            <h7>Enter your stake address in the below input, if using Daedalus follow the instructions if not follow Pool Search.</h7>

            <br></br>
            <h4><b>Stake Address:</b></h4>
            <h7>You will need your Stake Address, here is how to find it. </h7>
            <h7><b>Daedalus:</b> Open Daedalus > Click Delegation Center > Rewards > Copy Stake Address</h7>
            <h7><b>Yoroi:</b> Click <a href={"https://poolpeek.com/poolsearch"} target="_blank" rel="noreferrer">POOL SEARCH</a> > Enter pool ticker > Click Delegates > Search for your wallet Amount > Click the Stake Address</h7>
            
            
            
            <br></br>
            <Input
              style={{ fontSize: 14 }}
              type="text"
              className="cr-search-form__input"
              placeholder="Enter Stake Address."
              value={this.state.stakingAddress}
              onChange={this.handleChange()}
            />
            <br></br>
            <Button color="primary" onClick={() => { this.getStakingRewards() }}>Submit</Button>

            {this.state.stakingRewardsList != null &&
              <div style={{ width: "100%", alignItems: "left" }}>
                <br></br>
                <Button color="primary" onClick={() => this.exportToCSV(this.state.stakingRewardsList, 'StakingRewards')} style={{ width: "100%", alignItems: "right" }}>Download Excel</Button>
                <Table {...{ ['striped']: true }}>
                  <thead>
                    <tr>
                      <th>Epoch</th>
                      <th>Pool</th>
                      <th>Reward</th>
                      {/* <th>Reward_Date</th> */}
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
