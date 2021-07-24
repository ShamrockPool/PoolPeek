import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';
import brave from 'assets/img/teampeek/brave.jpg';
import shamrock from 'assets/img/twitprofile.jpg';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2021 SHA/EAGLE/BRAVE Productions.
          <br />
          <i>Built by small pool owners for small pool delegators.</i>
          {/* <br/> */}
          <img
            src={shamrock}
            className="pr-2"
            width="70vh" height="70vh"
          />
          <img
            src={brave}
            className="pr-2"
            width="70vh" height="70vh"
          />
          <img src="https://m1crypto.co/assets/pool-metadata/icon-64x64.png" />
          <br /><br />
          All opinions are our own and do not constitute financial advice in any way whatsoever.<br />
          Nothing published by us constitutes an investment recommendation.<br />
          We strongly recommend you perform your own independent research before making any financial decisions.<br />
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
