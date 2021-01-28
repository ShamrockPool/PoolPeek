import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Form, Input } from 'reactstrap';

export default class FetchPoolList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            loading: true,
            pools: null,
            searchQuery: "http://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17"
        };
    }

    handleChange = (query) => (e) => {
        console.log("query>>>", query);
        console.log("value>>>", e.target.value);
        this.state.searchQuery = "http://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17" + query + e.target.value;
        this.getPoolList(this.state.searchQuery);
    }

    async componentDidMount() {
        this.getPoolList();
    }

    async getPoolList() {
        console.log("query:" + this.state.searchQuery)
        const url = this.state.searchQuery;
        const response = await fetch(url);
        const data = await response.json();
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

                <Form inline className="cr-search-form">
                    <Input
                        type="text"
                        className="cr-search-form__input"
                        placeholder="PoolID...."
                        onChange={this.handleChange("&poolid=")}
                        value={this.state.poolId}
                    />
                </Form>

                <Form inline className="cr-search-form">
                    <Input
                        type="text"
                        className="cr-search-form__input"
                        placeholder="Ticker...."
                        onChange={this.handleChange("&ticker=")}
                        value={this.state.poolTicker}
                    />
                </Form>

                <Form inline className="cr-search-form">
                    <Input
                        type="text"
                        className="cr-search-form__input"
                        placeholder="Name...."
                        onChange={this.handleChange("&name=")}
                        value={this.state.poolName}
                    />
                </Form>

                <div>Displaying {this.state.pools.length} pools.</div>
                <Row>
                    <Col>
                        {this.state.pools.map(function (item, key) {
                            return (
                                <div key={key}>
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