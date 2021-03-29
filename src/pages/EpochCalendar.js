
import Page from 'components/Page';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'styles/calendar.css';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import Timer from "react-compound-timer";
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const localizer = momentLocalizer(moment);

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
    epochSecondsRemaining: 0
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

  generateEpochEvents() {
    console.log("hello");

    var epochDate = new Date(2017, 8, 23, 21, 44, 59);
    console.log(epochDate);
    var today = new Date(new Date().toUTCString());
    var endDate = new Date(today.getFullYear(), 12, 31, 21, 45);

    console.log(endDate);
    var events = [];
    var epoch = 0;
    var epochLength = 5;

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
      }

      epoch++;
      epochDate = new Date(epochEndDate);
      events.push(event);
    }
    return events;
  }



  render() {

    return (
      <Page
        className="EpochCalendarPage"
        title={this.props.title}
      >
        <div>
          {this.state.loading == true ? <GridLoader color={'#45b649'} loading={this.state.loading} css={override} size={100} />
            : (<div>
              <Timer
                initialTime={this.state.epochSecondsRemaining}
                direction="backward"
              >

                <Card style={cardBodyStyle} body>
                  
                  <div className="container-fluid" style={{  width: "100%" }}>

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

              <br></br>
              <Card style={cardBodyStyle} body>
                < Calendar
                  localizer={localizer}
                  events={
                    this.state.events
                  }
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 750 }}
                />
              </Card>
            </div>)}
        </div>
      </Page>
    );
  }
}
export default EpochCalendar;
