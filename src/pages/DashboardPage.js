import SearchInput from 'components/SearchInput';
import Page from 'components/Page';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

const tableTypes = ['', 'bordered', 'striped', 'hover'];

class DashboardPage extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page
        className="DashboardPage"
        title="Home"
        // breadcrumbs={[{ name: 'Home', active: true }]}
      >

      <SearchInput />

      <Row>
          <Col>
            <Card className="mb-3">
              <CardHeader>{'SHA☘ - Shamrock'}</CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Card body>
                      <Table>
                        <tbody>
                          <tr>
                            <th scope="row">Pool Id</th>
                            <td>be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6</td>
                          </tr>
                          <tr>
                            <th scope="row">Website</th>
                            <td><a href="https://shamrock-pool.com/" target="_blank">https://shamrock-pool.com/</a></td>
                          </tr>
                          <tr>
                            <th scope="row">Produced Blocks</th>
                            <td>7</td>
                          </tr>
                          <tr>
                            <th scope="row">Pool Info</th>
                            <td>Pool margin: 0%    Pledge: 30,003 ₳     Cost per epoch: 340 ₳</td>
                          </tr>
                          <tr>
                            <th scope="row">Stake</th>
                            <td>Active Stake: 3,190,455.24 ₳     Delegators: 14</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>


      </Page>
    );
  }
}
export default DashboardPage;
