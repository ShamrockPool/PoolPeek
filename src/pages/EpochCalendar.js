
import Page from 'components/Page';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'styles/calendar.css';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import Timer from "react-compound-timer";
import { Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import TextField from '@material-ui/core/TextField';

const localizer = momentLocalizer(moment);
const inputnamewidth = 2;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
  paddingRight: 10,
  align: "center"
};

const width = window.innerWidth;

class EpochCalendar extends React.Component {
  state = {
    loading: true,
    events: [],
    epochSecondsRemaining: 0,
    rewardsDate: null

  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    var events = this.generateEpochEvents();

    this.state.events = events;
    this.setState({ events: events });
    this.setState({ loading: false });
  }

  getStakeRewardsDate(date) {
    //console.log(date)
    var epochDate = new Date(2017, 8, 23, 21, 44, 59);
    var today = new Date(new Date().toUTCString());
    var endDate = new Date(today.getFullYear(), 12, 31, 21, 45);
    var stakedDate = new Date(date);
    var events = [];
    var epoch = 0;
    var epochLength = 5;
    var events = this.state.events;

    for (let index = 0; index < events.length; index++) {
      const event = events[index];
      if (event.title == '*Staking Rewards paid') {
        events.splice(index, 1);
      }
    }

    var epochsSinceLiveEpoch = 0;
    var wasInLiveEpoch = false;

    var stakeRewardEvent = null;

    while (epochDate.getTime() < endDate.getTime()) {
      var epochEndDate = new Date(epochDate);
      epochEndDate.setDate(epochEndDate.getDate() + epochLength);

      if (stakedDate > epochDate && stakedDate < epochEndDate) {
        //in epoch set rewards to 3 epochs from now
        wasInLiveEpoch = true;
      }
      if (wasInLiveEpoch) {
        epochsSinceLiveEpoch++;
        if (epochsSinceLiveEpoch == 4) {
          var dateString = "End of Epoch " + epoch;
          this.setState({ rewardsDate: dateString });
          stakeRewardEvent = {
            'title': '*Staking Rewards paid',
            'allDay': false,
            'start': epochEndDate,
            'end': epochEndDate,
          }
          break;
        }
      }
      epoch++;
      epochDate = new Date(epochEndDate);
    }


    events.push(stakeRewardEvent);
    this.setState({ events: events });
  }

  generateEpochEvents() {
    var epochDate = new Date(2017, 8, 23, 21, 44, 59);
    var today = new Date(new Date().toUTCString());
    var endDate = new Date(today.getFullYear(), 12, 31, 21, 45);

    var events = [];
    var epoch = 0;
    var epochLength = 5;

    var epochsSinceLiveEpoch = 0;
    var wasInLiveEpoch = false;

    while (epochDate.getTime() < endDate.getTime()) {
      var epochEndDate = new Date(epochDate);
      epochEndDate.setDate(epochEndDate.getDate() + epochLength);

      var event = {
        'title': 'Epoch ' + epoch,
        'allDay': false,
        'start': epochDate,
        'end': epochEndDate,
      }


      if (today > epochDate && today < epochEndDate) {
        var timeInEpoch = epochEndDate.getTime() - new Date(Date.now() + (new Date().getTimezoneOffset() * 60000)).getTime();
        this.state.epochSecondsRemaining = timeInEpoch;

        //in epoch set rewards to 3 epochs from now
        // wasInLiveEpoch = true;
      }

      // if (wasInLiveEpoch) {
      //   epochsSinceLiveEpoch++;
      //   if (epochsSinceLiveEpoch == 5) {
      //     var firestRewardEvent = {
      //       'title': '*First Staking Rewards',
      //       'allDay': false,
      //       'start': epochEndDate,
      //       'end': epochEndDate,
      //     }
      //     events.push(firestRewardEvent);
      //   }
      // }
      epoch++;
      epochDate = new Date(epochEndDate);
      events.push(event);
    }
    return events;
  }

  eventStyleGetter(event, start, end, isSelected) {
    //console.log(event);
    if (event.title == '*Staking Rewards paid') {
      var style = {
        backgroundColor: 'red'
      };
      return {
        style: style
      };
    } else {
      var epoch = event.title.replace("Epoch ", "");
      if (epoch % 2) {
        var style = {
          backgroundColor: 'black'
        };
        return {
          style: style
        };
      }
    }

  }


  render() {

    return (
      <Page
        className="EpochCalendarPage"
        title={this.props.title}
      >
        <div>
          {this.state.loading == true ? <GridLoader color={'#45b649'} loading={this.state.loading} css={override} size={100} />
            : (<Col>
              <Row>
                <Col lg={7} md={12} sm={12} xs={12} className="mb-3">
                  <Timer
                    initialTime={this.state.epochSecondsRemaining}
                    direction="backward"
                  >
                    <Card style={cardBodyStyle} body>
                      <div className="container-fluid" style={{ width: "100%" }}>

                        <h6><b>Next Cardano Epoch starts in:</b></h6>
                        <Table {...{ ['striped']: true }}>
                          <thead>
                            <tr>
                              <th>Days</th>
                              <th>Hours</th>
                              <th>Minutes</th>
                              <th>Seconds</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><Timer.Days /></td>
                              <td><Timer.Hours /></td>
                              <td><Timer.Minutes /></td>
                              <td><Timer.Seconds /></td>
                            </tr>
                          </tbody>
                        </Table>

                      </div>
                    </Card>
                  </Timer>
                </Col>

                <Col lg={5} md={12} sm={12} xs={12} className="mb-3">
                  <Card style={cardBodyStyle} body>
                    <div className="container-fluid" style={{ width: "100%", height: "100%" }}>
                      <h6><b>When staking rewards:</b></h6>
                      <Label for="name" sm={3}>Staked date: </Label>
                      <TextField
                        id="date"
                        type="date"
                        // defaultValue={this.state.project.releaseDate}
                        // className={useStyles().textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={e => this.getStakeRewardsDate(e.target.value)}
                        id="name"
                      />
                      <br></br>

                      <Label for="name" sm={3}>First rewards:</Label>
                      {this.state.rewardsDate}
                    </div>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Card style={cardBodyStyle} body>
                  < Calendar
                    localizer={localizer}
                    events={
                      this.state.events
                    }
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 700 }}
                    eventPropGetter={(this.eventStyleGetter)}
                  />
                </Card>
              </Row>
            </Col>)}
        </div>
      </Page>
    );
  }
}
export default EpochCalendar;
