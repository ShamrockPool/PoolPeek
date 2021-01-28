import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';
import Pool from 'components/Pool';
let queryParams = {
    "poolid": "",
    "ticker": "",
    "name": ""
};

export default class FetchPoolListQuickQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            loading: true,
            pools: null,
            baseUrl: "http://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17",
            searchQuery: props.query
        };
    }
    //be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6

    async componentDidMount() {
        this.getPoolList();
    }

    async getPoolList() {
        console.log("getPoolList query" + this.state.searchQuery)
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