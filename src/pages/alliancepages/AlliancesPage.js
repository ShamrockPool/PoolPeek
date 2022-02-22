
import Page from 'components/Page';
import React from 'react';
import 'styles/calendar.css';
import { Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import xspo from 'assets/img/alliance/xspo.png';
import cspa from 'assets/img/alliance/cspa.png';

const imageHeight = "150vh";


class AlliancesPage extends React.Component {
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
  }



  render() {

    return (
      <Page
        className="EpochCalendarPage"
        title="Alliance's"
      >
        <h3>Alliances play a huge part in the Cardano stake pool community here are some of the alliances to checkout and support. If you would like your alliance listed drop us a DM on twitter.</h3>
        <Row tyle={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Link to={{ pathname: '/alliances/xspo' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={xspo}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>XSPO Alliance</h2>
                  <h3>Extra Small Stake Pool Operators Alliance</h3>                  
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/alliances/cspa' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={cspa}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>CSPA Alliance</h2>
                  <h3>Cardano Single Pool Alliance.</h3>                  
                </div>
              </div>
            </div>
          </Link >


        </Row>
      </Page>
    );
  }
}
export default AlliancesPage;
