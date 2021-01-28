import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { Form, Input } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';
import CardanoImage from 'assets/img/cardanoIcon.png';
import Pool from 'components/Pool';
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
            baseUrl: "https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17",
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

    componentDidUpdate(){
        this.render();
    }

    async getPoolList() {
        console.log(this.props.query);

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
                        <Pool pools={this.state.pools} /> 
                    </Col>
                </Row>
            </div>
        );
    }
}