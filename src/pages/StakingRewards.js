
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

  exportToCSV(apiData, fileName){
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
