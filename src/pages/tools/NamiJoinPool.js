import Page from 'components/Page';
import React from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Table,
  Button
} from 'reactstrap';

import CircleLoader
  from "react-spinners/CircleLoader";
import { css } from "@emotion/core";
import "../../styles/styles.css";


const cardano = window.cardano;
const width = window.innerWidth;


class NamiJoinPool extends React.Component {
  state = {
    stats: null,
    walletConnected: false,
    namiEnabled: false,
  };

  async componentDidMount() {

    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    try {
      var namiEnabled = await cardano.isEnabled()
      this.setState({ namiEnabled: namiEnabled });
    } catch (error) {

    }





    window.scrollTo(0, 0);
  }



 



  render() {

    return (
      <Page
        className="SundaeISOPools"
        title=""
      >
 
      </Page>
    );
  }
}
export default NamiJoinPool;
