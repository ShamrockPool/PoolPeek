import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import logo115_91Image from 'assets/img/logo/logo_115_91.jpg';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import logo from 'assets/img/logo/logo-144x144.png';
import React from 'react';
import { faTwitter, faTelegram, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MdExtension,
  MdKeyboardArrowDown,
  MdRemoveCircleOutline,
  MdHourglassFull,
  MdPool,
  MdSearch,
  MdLocationOn,
  MdBuild,
  MdFormatListBulleted,
  MdAccountBalance,
  MdDateRange,
  MdMoneyOff
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Nav,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navComponents = [
  { to: '/charitypools', name: 'Charity', exact: false, Icon: MdPool },
  { to: '/baremetalpools', name: 'Bare Metal', exact: false, Icon: MdPool },
  { to: '/educationpools', name: 'Education', exact: false, Icon: MdPool },
  { to: '/twitterpools', name: 'Small Pools w/Twitter Handles', exact: false, Icon: MdPool },

  { to: '/zeroblockpools', name: 'Zero Block Small Pools', exact: false, Icon: MdPool },
  { to: '/onetotenblockpools', name: 'One to Ten Block Small Pools', exact: false, Icon: MdPool },
  { to: '/likelytoproduceblocks', name: 'Small Pools Likely to Mint Blocks', exact: false, Icon: MdPool },
  { to: '/retiringpools', name: 'Soon Retiring', exact: false, Icon: MdPool },
  { to: '/retiredpools', name: 'Retired', exact: false, Icon: MdPool }
];

const navFunQueries = [
  { to: '/fabuloustickers', name: 'Tickers', exact: false, Icon: MdFormatListBulleted },
  { to: '/fabulousnames', name: 'Names', exact: false, Icon: MdFormatListBulleted },
  { to: '/fabulousdescriptions', name: 'Descriptions', exact: false, Icon: MdFormatListBulleted },
];

const navSaturation = [
  { to: '/64milorgreater', name: '64M or Greater', exact: false, Icon: MdFormatListBulleted },
  { to: '/32milto64mil', name: '32M to < 64M', exact: false, Icon: MdFormatListBulleted },
  { to: '/16milto32mil', name: '16M to < 32M', exact: false, Icon: MdFormatListBulleted },
  { to: '/8milto16mil', name: '8M to < 16M', exact: false, Icon: MdFormatListBulleted },
];

const poolQueries = [
  { to: '/retiredpools', name: 'Retired With Stake', exact: true, Icon: MdRemoveCircleOutline },
  { to: '/saturatedpools', name: 'Saturated', exact: true, Icon: MdHourglassFull }
];

const isos = [  
  { to: '/hoskyinupools', name: 'Hosky Inu', exact: true, Icon: MdSearch },
  { to: '/sundaeiso', name: 'SundaeSwap', exact: true, Icon: MdSearch },
  { to: '/hoskypools', name: 'Hosky', exact: true, Icon: MdSearch }
];

const navItems = [
  { to: '/', name: 'Dashboard', exact: true, Icon: MdBuild },
  // { to: '/teampeek', name: 'Team Peek', exact: true, Icon: MdBuild },
  { to: '/poolsearch', name: 'Pool Search', exact: true, Icon: MdSearch },
  { to: '/poolsearchmap', name: 'Map Search', exact: true, Icon: MdLocationOn },
  { to: '/epochcalendar', name: 'Epoch Calendar', exact: true, Icon: MdDateRange },
  { to: '/stakingcalculator', name: 'Staking Calculator', exact: true, Icon: MdAccountBalance },
  { to: '/stakingrewards', name: 'Staking Rewards', exact: true, Icon: MdMoneyOff }
  // { to: '/aboutus', name: 'About Us', exact: true, Icon: MdMood }

];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: false,
    isOpenContents: true,
    isOpenPages: true,
    isOpenAdafolio: false,
    isOpenFunQuery: false,
    isOpenSaturation: false,
    isOpenQueries: false,
    navAdaFolio: [],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')} style={{ alignItems: "center" }}>

          <Container>
            <Row className="justify-content-md-center">
              <Col style={{ backgroundColor: 'black', width: '115px', padding: '0px' }}>
                <img src={logo}
                  width="115"
                  height="100"
                  className="pr-2"
                  title="Welcome to PoolPeek.com" />
              </Col>
              <Col style={{ backgroundColor: 'black', padding: '0px' }}>

                <h3>Cardano Stake Pool Explorer</h3>

              </Col>
            </Row>
          </Container>


          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <b><span className="">{name}</span></b>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Queries')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <b><span className=" align-self-start">POOL QUERIES</span></b>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenQueries
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenQueries}>
              {poolQueries.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>


            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Saturation')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <b><span className=" align-self-start">POOL OFFERINGS</span></b>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenSaturation
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenSaturation}>
              {isos.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <b><span className=" align-self-start">Pool Queries</span></b>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenComponents}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          


            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Saturation')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <b><span className=" align-self-start">64M 32M 16M 8M</span></b>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenSaturation
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenSaturation}>
              {navSaturation.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>



            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('FunQuery')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <b><span className=" align-self-start">Fabulous 500</span></b>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenFunQuery
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenFunQuery}>
              {navFunQueries.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Adafolio')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <b><span className=" align-self-start">adafolio Portfolios</span></b>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenAdafolio
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenAdafolio}>
              {this.state.navAdaFolio.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}

            <Row className="justify-content-md-center">
              <Col xs={12} sm={4} md={4}>
                <br></br>
                <a href="https://twitter.com/CardanoPoolPeek" target="_blank" rel="noreferrer">
                  <Row style={{
                    color: "white", justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon size="2x" icon={faTwitter} style={{ color: "white" }} />
                    <p style={{ color: '#FFFFFF' }}>Follow Us</p>
                  </Row></a>
              </Col>
              <Col xs={12} sm={4} md={4}>
                <br></br>
                <a href="https://discord.gg/BtdGMQjnfZ" target="_blank" rel="noreferrer">
                  <Row style={{
                    color: "white", justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}>
                    <FontAwesomeIcon size="2x" icon={faDiscord} style={{ color: "white" }} />
                    <p style={{ color: '#FFFFFF' }}>Discord</p>
                  </Row></a>
              </Col>
            </Row>

          </Nav>

        </div>
      </aside>
    );
  }
}

export default Sidebar;
