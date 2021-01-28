import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Form, Input } from 'reactstrap';
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';

let queryParams = {
    "poolid": "",
    "ticker": "",
    "name": ""
};

export default class FetchPoolList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            loading: true,
            pools: null,
            baseUrl: "http://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17",
            searchQuery: ""
        };
    }
    //be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6
    handleChange = (query) => (e) => {

        if (query === "&poolid=")
            queryParams.poolid = query + e.target.value;

        if (query === "&ticker=")
            queryParams.ticker = query + e.target.value;

        if (query === "&name=")
            queryParams.name = query + e.target.value;

        console.log("queryParams>>>", queryParams);
        this.state.searchQuery = "";

        var allQueryParams = "";
        this.mapObject(queryParams, function (key, value) {
            if (value !== "") {
                allQueryParams += value;
            }
        })
        this.state.searchQuery = allQueryParams;
        this.getPoolList(this.state.searchQuery);
    }

    async componentDidMount() {
        this.getPoolList();
    }

    async getPoolList() {
        console.log(this.props.query);
        console.log("query:" + this.state.searchQuery);
        const response = await fetch(this.state.baseUrl + this.state.searchQuery);

        

        const data = await response.json();
        this.setState({ pools: data.poolpeek.pools, loading: false })
    }

    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
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
                <br />
                <h3>Results:</h3><p> Displaying {this.state.pools.length} pools.</p>
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
                                                                <tr>
                                                                    <th scope="row">External Sites</th>
                                                                    
                                                                    <td><a href={"https://pool.pm/" + item.pool_id} target="_blank" rel="noreferrer">                                                                <img
                                                                        src={PoolPmImage}
                                                                        className="pr-2"
                                                                        alt=""
                                                                    /></a>
                                                                    <a href={"https://adapools.org/pool/" + item.pool_id} target="_blank" rel="noreferrer">                                                                <img
                                                                        src={AdaPoolImage}
                                                                        className="pr-2"
                                                                        alt=""
                                                                    /></a>
                                                                   <a href={"https://pooltool.io/pool" + item.pool_id} target="_blank" rel="noreferrer">                                                                <img
                                                                        src={PooltoolImage}
                                                                        className="pr-2"
                                                                        alt=""
                                                                    /></a></td>
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