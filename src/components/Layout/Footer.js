import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2020/2021 Shamrock Loco Productions.
          <br/><br/>
		   All opinions are our own and do not constitute financial advice in any way whatsoever.<br/>
		   Nothing published by us constitutes an investment recommendation.<br/>
		   We strongly recommend you perform your own independent research before making any financial decisions.<br/>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
