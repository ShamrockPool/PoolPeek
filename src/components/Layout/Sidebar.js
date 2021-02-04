import logo200Image from 'assets/img/logo/logopp_200.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdDashboard,
  MdExtension,
  MdKeyboardArrowDown,
  MdRadioButtonChecked,
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
  { to: '/baremetalpools', name: 'Bare Metal Pools', exact: false, Icon: MdRadioButtonChecked },
  { to: '/educationpools', name: 'Education Pools', exact: false, Icon: MdRadioButtonChecked },
  { to: '/charitypools', name: 'Charity Pools', exact: false, Icon: MdRadioButtonChecked },
  { to: '/womeninblockchainpools', name: "Women In Blockchain Pools", exact: false, Icon: MdRadioButtonChecked },
  { to: '/zeroblockpools', name: 'Zero Block Pools', exact: false, Icon: MdRadioButtonChecked },
];


const navItems = [
  { to: '/', name: 'HOME', exact: true, Icon: MdDashboard }
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    navAdaFolio: null,
  };

  //get adafolio groups and map to nav options
  async getAdafolioGroups(){
    const response = await fetch('https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&op=afgroups');
    const data = await response.json();
    var dataMap = data.poolpeek.adafolioGroups.map((rec, index) => (
      {to:'TODO_ROUTE_USING_ID', name:rec.name, exact:false, Icon: MdRadioButtonChecked}  
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
          <Navbar>
            <SourceLink className="navbar-brand d-flex" >
              <img
                src={logo200Image}
                width="100"
                height="100"
                className="pr-2"
                alt="centered image"
              />
            </SourceLink>
          </Navbar>
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
                  <span className=" align-self-start">Quick Queries</span>
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
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
