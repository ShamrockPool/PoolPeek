import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import logo200Image from 'assets/img/logo/logopp_200.png';
import logo100_75Image from 'assets/img/logo/logo_100_75.png';
import logo115_91Image from 'assets/img/logo/logo_115_91.jpg';

import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  MdDashboard,
  MdExtension,
  MdKeyboardArrowDown,
  MdRadioButtonChecked,
  MdMood,
  MdPool,
  MdSearch
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
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
  { to: '/poolpeek', name: 'The Dynamic Duo', exact: false, Icon: MdPool },
  { to: '/charitypools', name: 'Charity', exact: false, Icon: MdPool },
  { to: '/baremetalpools', name: 'Bare Metal', exact: false, Icon: MdPool },
  { to: '/educationpools', name: 'Education', exact: false, Icon: MdPool },
  { to: '/zeroblockpools', name: 'Zero Block', exact: false, Icon: MdPool },
  { to: '/retiringpools', name: 'Soon Retiring', exact: false, Icon: MdPool },
  { to: '/retiredpools', name: 'Retired', exact: false, Icon: MdPool }
];

const navFunQueries = [
  { to: '/funtickers', name: 'Tickers', exact: false, Icon: MdSearch },
  { to: '/funnames', name: 'Names', exact: false, Icon: MdSearch },
  { to: '/fundescriptions', name: 'Descriptions', exact: false, Icon: MdSearch },
];

const navItems = [
  { to: '/', name: 'HOME', exact: true, Icon: MdDashboard },
  { to: '/aboutus', name: 'About Us', exact: true, Icon: MdMood }
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    isOpenAdafolio: false,
    isOpenFunQuery: false,
    navAdaFolio: [],
  };

  //get adafolio groups and map to nav options
  async getAdafolioGroups(){
    const response = await fetch('https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&op=afgroups');
    const data = await response.json();
    var dataMap = data.poolpeek.adafolioGroups.map((rec, index) => (
      {to:'adafolio?adafolioid=' + rec.id + "&qname=" + encodeURIComponent(rec.name), name:ReactHtmlParser(rec.name), exact:false, Icon: MdRadioButtonChecked}  
    ));
    this.setState({ navAdaFolio: dataMap});
  }

  async componentDidMount() {
    this.getAdafolioGroups();    
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
        <div className={bem.e('content')} style={{alignItems: "center" }}>
      
        <Container>
          <Row className="justify-content-md-center">
            <Col  style={{backgroundColor: 'black', width:'115px', padding:'0px'}}>
              <img src={logo115_91Image}
                            width="115"
                            height="91"
                            className="pr-2"
                            title="Welcome to PoolPeek.com"/>
            </Col>
            <Col style={{backgroundColor:'black', padding:'0px'}}>
              
              A different kind of Cardano Stake Pool Explorer
             
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
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Pool Queries</span>
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
              onClick={this.handleClick('FunQuery')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Fun Queries</span>
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
                  <span className=" align-self-start">adafolio Portfolios</span>
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
            </Collapse>
          


          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
