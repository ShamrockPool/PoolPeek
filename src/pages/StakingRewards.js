
import Page from 'components/Page';
import React from 'react';
import { Input, Pagination, PaginationItem, PaginationLink, Table, Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { isEmpty } from 'utils/stringutil.js';
import StakingRewardsList from 'components/StakingRewardsList';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { baseUrl } from '../assets/services';
import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

var Loader;

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

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class StakingRewards extends React.Component {
  state = {
    loading: true,
    stakingAddress: null,
    stakingRewardsList: null,
    startLoader: false
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    Loader = await import('@emurgo/cardano-serialization-lib-browser');


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
      this.setState({ startLoader: true, stakingRewardsList: null });

      var inputAddress = this.state.stakingAddress;

      if(!inputAddress.startsWith('stake')){
        var bech32Address = Loader.Address.from_bech32(this.state.stakingAddress);
        var base_addr = Loader.BaseAddress.from_address(bech32Address);
  
  
        // Extract stake credential               
        let stake_cred = base_addr.stake_cred()
        console.log(Buffer.from(stake_cred.to_keyhash().to_bytes().buffer).toString("hex"))
  
        // Build reward address (add 0xe1 prefix to 28 last bytes of stake credential one) 
        let reward_addr_bytes = new Uint8Array(29)                                          
        reward_addr_bytes.set([0xe1], 0)                                                
        reward_addr_bytes.set(stake_cred.to_bytes().slice(4, 32), 1)             
        let reward_addr = Loader.RewardAddress.from_address(Loader.Address.from_bytes(reward_addr_bytes))
  
        inputAddress = reward_addr.to_address().to_bech32();
      }


      const response = await fetch(baseUrl + '/rewards/multipleinputs/' + inputAddress);
      const data = await response.json();
      this.setState({ stakingRewardsList: data, loading: false, startLoader: false });
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
            {/* <br></br>
            <h7>Register with our Staking Rewards <a href={"http://t.me/poolpeek_bot"} target="_blank" rel="noreferrer">Telegram BOT!!</a></h7> */}

            <br></br>

            <h4><b>Input</b></h4>
            <h7>Receiving Address - or - Stake Address</h7>

            <br></br>
            <Input
              style={{ fontSize: 14 }}
              type="text"
              className="cr-search-form__input"
              placeholder="Enter Address."
              value={this.state.stakingAddress}
              onChange={this.handleChange()}
            />
            <br></br>
            <Button color="primary" onClick={() => { this.getStakingRewards() }}>Submit</Button>

            {this.state.startLoader == true && <div><br></br><CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={100} />
              <br></br><p><b>Fetching Data, this can take a few seconds as we retrieve ADA prices.</b></p></div>}

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
                      <th>Reward_Date</th>
                      <th>Paid_Date</th>
                      <th>ADA Price</th>
                      <th>USD Value</th>
                    </tr>
                  </thead>
                  {this.state.stakingRewardsList != null &&
                    <StakingRewardsList stakingRewardsList={this.state.stakingRewardsList} />}
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
