import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

export default class FetchPoolList extends React.Component {
    state = {
        loading: true,
        pools: null
    }

    async componentDidMount() {
        const url = "http://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&page=1";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data.poolpeek);
        this.setState({ pools: data.poolpeek.pools, loading: false })

    }

    render() {
        if (this.state.loading) {
            return <div>loading...</div>
        }

        if (!this.state.pools) {
            return <div>Pools not found...</div>
        }

        return (
            <div className="container-fluid">
                <div>Displaying {this.state.pools.length} pools.</div>
                <Row>
                    <Col>
                        {this.state.pools.map(function (item, key) {
                            return (
                                <div>
                                    <Card className="mb-3">
                                        <CardHeader>{item.name}</CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <Card body>
                                                        <Table>
                                                            <tbody>
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