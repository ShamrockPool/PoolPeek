
import Page from 'components/Page';
import React from 'react';
import 'styles/calendar.css';
import { Card, CardBody, CardHeader, Col, Row, Table, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import sundaereverse from 'assets/img/iso/sundaereverseiso.png';
import ardanoiso from 'assets/img/iso/ardanaiso.png';
import hosky from 'assets/img/iso/hosky.png';
import bison from 'assets/img/iso/bison.png';
import hoskyinu from 'assets/img/iso/hoskyinu.webp';
import sundaeswapiso from 'assets/img/iso/sundaeswapiso.jfif';
import ppc from 'assets/img/iso/ppc.png';
import geniusyieldiso from 'assets/img/iso/geniusyieldisov2.png';
import aneta from 'assets/img/iso/aneta.svg';
import flick from 'assets/img/iso/flick.jpg_small';

const imageHeight = "150vh";


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
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={sundaereverse}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Sundaeswap RISO</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/poolpeekcoinpools' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={ppc}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>PoolPeek Coin</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/hoskypools' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={hosky}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Hosky</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/bisonpools' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={bison}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Bison</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/hoskyinupools' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={hoskyinu}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Hosky Inu</h2>
                  <h3>Community ISO</h3>
                  <h4>LIVE</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/geniusyieldiso' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={geniusyieldiso}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Genius Yield ISO</h2>
                  <h3>Project Funding ISO</h3>
                  <h4>Live</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/anetabtciso' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={aneta}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Aneta BTC</h2>
                  <h3>Project Funding ISO</h3>
                  <h4>Live</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/flicktoiso' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={flick}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Flickto</h2>
                  <h3>Project Funding ISO</h3>
                  <h4>Live</h4>
                </div>
              </div>
            </div>
          </Link >

          

          <Link to={{ pathname: '/ardanaiso' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={ardanoiso}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
                  <h2>Ardana ISO</h2>
                  <h3>Community ISO</h3>
                  <h4>Coming Soon</h4>
                </div>
              </div>
            </div>
          </Link >

          <Link to={{ pathname: '/flicktoiso' }}>
            <div className="IsoCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>

                <img
                  src={sundaeswapiso}
                  width="70vh" height={imageHeight}
                />

                <div className="IsoCard-body">
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
