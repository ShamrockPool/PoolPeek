
import Page from 'components/Page';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
const localizer = momentLocalizer(moment);

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class EpochCalendar extends React.Component {
  state = {
    loading: true,
    events: []
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

    var epochDate = new Date(2017, 8, 23, 21, 44);
    console.log(epochDate);
    var today = new Date();
    var endDate = new Date(today.getFullYear(), 12, 31, 21, 45);

    console.log(endDate);
    var events = [];
    var epoch = 0;
    var epochLength = 5;

    while (epochDate.getTime() < endDate.getTime()) {
      var epochEndDate = new Date(epochDate);
      epochEndDate.setDate(epochEndDate.getDate() + epochLength);
      console.log(epochEndDate);

      var event = {
        'title': 'Epoch ' + epoch,
        'allDay': false,
        'start': epochDate,
        'end': epochEndDate,
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
            : (< Calendar
              localizer={localizer}
              events={
                this.state.events
              }
              startAccessor="start"
              endAccessor="end"
              style={{ height: 750 }}
            />)}
        </div>
      </Page>
    );
  }
}
export default EpochCalendar;
