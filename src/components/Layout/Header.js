import React from 'react';
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  Nav,
  Navbar,
} from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');


class Header extends React.Component {
  state = {};

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <p>Pool Peek - A different kind of Cardano stake pool explorer.</p>
          {/* <p>PoolPeek.com is a "light-weight" Cardano stake pool explorer that analyzes the publicly available registration data and other data elements such as number of produced blocks.</p>
          <p>If you would like to support our development efforts, please consider delegating to the LOCO Pool or Shamrock Pool</p> */}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
