import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

export default class FetchPoolList extends React.Component {
    /*state = {
        loading: true
    }*/

    render() {

        if (this.props.loading) {
            return <div>loading...</div>
        }

        if (!this.props.appPools) {
            return <div>Pool(s) not found...</div>
        }

        return (
            <div className="container-fluid">
                <div>Displaying {this.props.appPools.length} pools.</div>
                <Row>
                    <Col>
                        {this.props.appPools.map(function (item, key) {
                            return (
                                <div key={item.pool_id}>
                                    <Card className="mb-3">
                                        <CardHeader>{item.name}</CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <Card body>
                                                    <p>{item.description}</p>
                                                        <Table>
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">Ticker</th>
                                                                    <td>{item.ticker}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Pool Id</th>
                                                                    <td>{item.pool_id}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Website</th>
                                                                    <td><a href={item.homepage} target="_blank" rel="noreferrer">{item.homepage}</a></td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Produced Blocks</th>
                                                                    <td>{item.blocks}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Pool Info</th>
                                                                    <td>Pool margin: {item.margin_pct}%    Pledge: {item.pledge} ₳     Cost per epoch: {item.cost_per_epoch} ₳</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Stake</th>
                                                                    <td>Active Stake: {item.active_stake} ₳     Delegators: {item.active_stake_delegator_count}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </div>
        );
    }
}