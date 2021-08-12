import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';
import brave from 'assets/img/teampeek/brave.jpg';
import shamrock from 'assets/img/twitprofile.jpg';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2021 Paddy Productions.
          <a href="https://shamrock-pool.com/" target="_blank">
            <img
              src={shamrock}
              className="rounded"
              style={{ width: "7vh", height: "7vh", cursor: 'pointer' }}
            />
          </a>
          <br />
          {/* <i>Built by small pool owners for small pool delegators.</i> */}

          {/* <br/> */}

          {/* <a href="https://www.braveheartstakepool.com/" target="_blank">
            <img
              src={brave}
              className="pr-2"
              width="70vh" height="70vh"
            /></a>
          <a href="https://m1crypto.co/ada-pool" target="_blank">
            <img src="https://m1crypto.co/assets/pool-metadata/icon-64x64.png" /></a> */}
            
          {/* <br /><br />
          All opinions are our own and do not constitute financial advice in any way whatsoever.<br /> */}
          Nothing published by us constitutes an investment recommendation.<br />
          We strongly recommend you perform your own independent research before making any financial decisions.<br />
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
