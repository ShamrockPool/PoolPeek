import React from 'react';
import { MdSearch } from 'react-icons/md';
import { CardBody, Button, Row, Card, CardHeader } from 'reactstrap';
import Select from 'react-select';
import { Link, Redirect } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import ReactHtmlParser from 'react-html-parser';

const cardheaderStyle = {
  borderBottom: 'solid 1px green',
  borderTop: 'solid 1px green',
  borderRight: 'solid 1px green',
  borderLeft: 'solid 1px green',
  // background: 'green',
  // color: 'white',
  paddingBottom: 0
};

const cardBodyStyle = {
  borderBottom: 'solid 1px green',
  // borderTop: 'solid 1px green',
  borderRight: 'solid 1px green',
  borderLeft: 'solid 1px green',
  // background: 'green',
  // color: 'white',
  paddingBottom: 0,
  paddingTop: 5,
  paddingLeft: 20,
  paddingRight: 10
};


class PoolSearchWizard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wizardStarted: false,

      wizardSaturationChoosen: false,
      wizardRemoveSaturated: false,
      wizardPoolSizeChoosen: false,
      wizardPoolSize: null,
      wizardProfessionalPoolChoosen: false,
      wizardProfessionalPool: false,
      wizardFeeChoosen: false,
      wizardFeeSize: null,
      wizardFixedFeeChoosen: false,
      wizardFixedFeeSize: null,
      wizardPoolHostingChoosen: false,
      wizardPoolHostingTypeSize: null,
      wizardCharityPoolChoosen: false,
      wizardCharityPool: false,
      wizardSinglePoolOperatorChoosen: false,
      wizardSinglePoolOperator: false
    };
  }



  componentDidMount() {

  }


  render() {
    const { selectedOption } = this.state;
    return (
      <Card >
        <CardHeader style={cardheaderStyle}><p><b>Pool Selection Wizard</b></p></CardHeader>
        <CardBody style={cardBodyStyle} body >
          {this.state.wizardStarted == false && <div className="WizardCard" style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
            onClick={() => this.setState({ wizardStarted: true })}>
            <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
              <div className="WizardCard-body">
                <h2>START</h2>
                <h3>Use our wizard to pick a pool that fits your needs.</h3>
              </div>
            </div>
          </div>}

          {/* ELIMINATE SATURATED AND LOW STAKED */}
          {this.state.wizardStarted && <div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>Eliminated Saturated and underfunded</h2>
                  <h4>Remove pools with more than 50Million Ada Staked and less than 50k Ada</h4>
                </div>
              </div>
            </div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>All pools</h2>
                  <h4>Saturation level doesnt bother me</h4>
                </div>
              </div>
            </div>
          </div>}


          {this.state.wizardStarted != false && <Row>
            <Button
              size="sm"
              onClick={() => this.setState({ wizardStarted: false })}
            >
              Reset
            </Button>
            <Button
              size="sm"
            >
              <Link to={{ pathname: '/allprojects' }}>
                Skip To Results
              </Link>
            </Button>
          </Row>}
        </CardBody>
      </Card>
    );
  }
}

export default PoolSearchWizard;

