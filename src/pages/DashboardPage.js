import Page from 'components/Page';
import ProductMedia from 'components/ProductMedia';
import { IconWidget, NumberWidget } from 'components/Widget';
import {
  teamPeekData,
} from 'demos/dashboardPage';
import React from 'react';
import {
  FaTwitter,
  FaTelegram,
  FaMobile,
  FaMobileAlt
} from 'react-icons/fa';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'utils/colors';

const today = new Date();

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
  paddingLeft: 10,
  paddingRight: 10
};


class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <Page
        className="DashboardPage"
      // title="Dashboard"
      // breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col >
            <NumberWidget
              title="ADA Supply"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col >
            <NumberWidget
              title="ADA Wallets"
              number="450,000"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col >
            <NumberWidget
              title="ADA Staked"
              number="22.2B"
              color="secondary"
              progress={{
                value: 72,
                label: '% of ADA Supply',
              }}
            />

          </Col>
        </Row>

        <Row>
          <Col >
            <a href="https://twitter.com/CardanoPoolPeek" target="_blank" rel="noreferrer">
              <IconWidget
                bgColor="white"
                inverse={false}
                icon={FaTwitter}
                title="Follow Our Twitter"
                subtitle=""
              />
            </a>
          </Col>

          <Col >
          <IconWidget
                bgColor="white"
                inverse={false}
                icon={FaMobileAlt}
                title="Download Mobile APP"
                subtitle=""
              />
          </Col>

          <Col >
            <a href="https://t.me/poolpeek" target="_blank" rel="noreferrer"> <IconWidget
              bgColor="white"
              inverse={false}
              icon={FaTelegram}
              title="Join Our Telegram"
              subtitle=""
            /></a>
          </Col>
        </Row>


        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader style={cardheaderStyle}><p><b>Team Peek</b> - Support poolpeek.com by staking with us!</p></CardHeader>
              <CardBody style={cardBodyStyle} body>
                {teamPeekData.map(
                  ({ id, image, title, description, poolid, right }) => (
                    //https://poolpeek.com/pool/be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6

                    <ProductMedia
                      key={id}
                      image={image}
                      title={title}
                      description={description}
                      poolid={poolid}
                    />
                  ),
                )}
              </CardBody>
            </Card>
          </Col>

          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader style={cardheaderStyle}><p><b>Pool of the hour</b></p></CardHeader>
              <CardBody style={cardBodyStyle} body>
                POOL PROMO HERE
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4" md="12" sm="12" xs="12">
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
