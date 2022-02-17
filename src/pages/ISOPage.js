
import Page from 'components/Page';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'styles/calendar.css';
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/core";
import Timer from "react-compound-timer";
import { Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import CardanoImage from 'assets/img/cardanoIcon.png';
import sundaereverse from 'assets/img/iso/sundaereverseiso.png';
import ardanoiso from 'assets/img/iso/ardanaiso.png';
import hosky from 'assets/img/iso/hosky.png';
import bison from 'assets/img/iso/bison.png';
import hoskyinu from 'assets/img/iso/hoskyinu.webp';
import sundaeswapiso from 'assets/img/iso/sundaeswapiso.jfif';
import ppc from 'assets/img/iso/ppc.png';
class ISOPage extends React.Component {
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

  }



  render() {

    return (
      <Page
        className="EpochCalendarPage"
        title="ISO's"
      >
        <p>A method for projects to align with the Cardano network to help distribute their tokens whether through their own Stakepools or Community StakePools.
          ISPO gives delegates the chance to delegate to a project to raise funds, distribute tokens or help fund their project.</p>
        <Row tyle={{
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Link to={{ pathname: '/sundaeriso' }}>
            <div className="ProjectCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={sundaereverse}
                  width="70vh" height="200vh"
                />

                <div className="ProjectCard-body">
                  <h2>Sundaeswap RISO</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/poolpeekcoinpools' }}>
            <div className="ProjectCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={ppc}
                  width="70vh" height="200vh"
                />

                <div className="ProjectCard-body">
                  <h2>PoolPeek Coin</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/hoskypools' }}>
            <div className="ProjectCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={hosky}
                  width="70vh" height="200vh"
                />

                <div className="ProjectCard-body">
                  <h2>Hosky</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/bisonpools' }}>
            <div className="ProjectCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={bison}
                  width="70vh" height="200vh"
                />

                <div className="ProjectCard-body">
                  <h2>Bison</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/hoskyinupools' }}>
            <div className="ProjectCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={hoskyinu}
                  width="70vh" height="200vh"
                />

                <div className="ProjectCard-body">
                  <h2>Hosky Inu</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/ardanaiso' }}>
            <div className="ProjectCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={ardanoiso}
                  width="70vh" height="200vh"
                />

                <div className="ProjectCard-body">
                  <h2>Ardana ISO</h2>
                  <h3>Community ISO</h3>
                  <h4>Coming Soon</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/sundaeiso' }}>
            <div className="ProjectCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={sundaeswapiso}
                  width="70vh" height="200vh"
                />

                <div className="ProjectCard-body">
                  <h2>Sundaeswap ISO</h2>
                  <h3>Community ISO</h3>
                  <h4>Ended</h4>
                </div>
              </div>
            </div>
          </Link >

        </Row>
      </Page>
    );
  }
}
export default ISOPage;
