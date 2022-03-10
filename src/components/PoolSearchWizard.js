import React from 'react';
import { MdSearch } from 'react-icons/md';
import { CardBody, Button, Row, Card, CardHeader } from 'reactstrap';
import Select from 'react-select';
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faHatWizard, faMagic } from '@fortawesome/free-solid-svg-icons';

class PoolSearchWizard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wizardStarted: false,

      wizardPledgeChoosen: null,
      wizardRemoveLowPledge: false,

      wizardSaturationChoosen: null,
      wizardRemoveSaturated: false,

      wizardPoolSizeChoosen: null,
      wizardPoolSize: null,

      wizardProfessionalPoolChoosen: null,
      wizardProfessionalPool: false,

      wizardFeeChoosen: null,
      wizardFeeSize: null,

      wizardFixedFeeChoosen: null,
      wizardFixedFeeSize: null,

      wizardPoolHostingChoosen: null,
      wizardPoolHostingTypeSize: null,

      wizardCharityPoolChoosen: null,
      wizardCharityPool: false,

      wizardSinglePoolOperatorChoosen: null,
      wizardSinglePoolOperator: false
    };
  }



  componentDidMount() {

  }


  render() {
    return (
      <Card >
        <CardHeader><h6><b>Pool Selection Wizard</b></h6><small>Use this wizard as a quick way to filter pools.</small></CardHeader>
        <CardBody body >
          {this.state.wizardStarted == false && <div className="WizardCard" style={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
            onClick={() => this.setState({ wizardStarted: true })}>
            <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
              <div className="WizardCard-body">
                <FontAwesomeIcon icon={faMagic} size="3x"  style={{ color: "red" }} />
                <h2>START</h2>
                <h3>Use our wizard to pick a pool that fits your needs.</h3>
              </div>
            </div>
          </div>}

          {/* START ELIMINATE LOW PLEDGE POOLS */}
          {this.state.wizardStarted && this.state.wizardPledgeChoosen == null && <div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null, wizardPledgeChoosen: true, wizardRemoveLowPledge: true })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>Eliminated Low Pledged Pools</h2>
                  <h4>Remove pools with less than 5k Ada pledged</h4>
                </div>
              </div>
            </div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null, wizardPledgeChoosen: true, wizardRemoveLowPledge: false })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>All pools</h2>
                  <h4>Pledge doesnt bother me</h4>
                </div>
              </div>
            </div>
          </div>}
          {/* END ELIMINATE LOW PLEDGE POOLS */}

          {/* START ELIMINATE SATURATED AND LOW STAKED */}
          {this.state.wizardPledgeChoosen && this.state.wizardSaturationChoosen == null && <div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null, wizardSaturationChoosen: true, wizardRemoveSaturated: true })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>Eliminated Saturated and underfunded</h2>
                  <h4>Remove pools with more than 50Million Ada Staked and less than 50k Ada Staked</h4>
                </div>
              </div>
            </div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null, wizardSaturationChoosen: true, wizardRemoveSaturated: false })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>All pools</h2>
                  <h4>Saturation level doesnt bother me</h4>
                </div>
              </div>
            </div>
          </div>}
          {/* END ELIMINATE SATURATED AND LOW STAKED */}

          {/* START ELIMINATE PROFESSIONAL POOLS */}
          {this.state.wizardSaturationChoosen && this.state.wizardProfessionalPoolChoosen == null && <div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null, wizardProfessionalPoolChoosen: true, wizardProfessionalPool: true })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>Professional Pool</h2>
                  <h4>Pool with Website and description.</h4>
                </div>
              </div>
            </div>
            <div className="WizardCard" style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
              onClick={() => this.setState({ wizardStarted: null, wizardProfessionalPoolChoosen: true, wizardProfessionalPool: false })}>
              <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                <div className="WizardCard-body">
                  <h2>All pools</h2>
                  <h4>This doesnt bother me.</h4>
                </div>
              </div>
            </div>
          </div>}
          {/* END ELIMINATE ELIMINATE PROFESSIONAL POOLS */}




          {this.state.wizardStarted != false && <Row>
            <Button
              size="sm"
              onClick={() => this.setState({
                wizardStarted: false, 
                wizardPledgeChoosen: null,
                wizardSaturationChoosen: null,
                wizardPoolSizeChoosen: null,
                wizardProfessionalPoolChoosen: null,
                wizardFeeChoosen: null,
                wizardFixedFeeChoosen: null,
                wizardPoolHostingChoosen: null,
                wizardCharityPoolChoosen: null,
                wizardSinglePoolOperatorChoosen: null
              })}
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

