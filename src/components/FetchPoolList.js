import React from 'react';
import { Col, Row, Form, Input, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from 'lodash';

import Scroll from '../components/Scroll'
import Pool from 'components/Pool';

const WAIT_INTERVAL = 1000
let queryParams = {
    "poolid": "",
    "ticker": "",
    "name": ""
};

const sid = Math.floor(Math.random() * 100) + Date.now()


export default class FetchPoolList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            loading: true,
            pools: null,
            query: null,
            baseUrl: "https://poolpeek.com/api.asp?k=838967e9-940b-42db-8485-5f82a72a7e17&sid=" + sid,
            searchQuery: "",
            currentPage: 0,
            pageCount: 0,
            poolid: "",
            ticker: "",
            name: ""

        };
    }
    //be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6
    handleChange = (query) => (e) => {

        if (query === "&poolid=") {
            queryParams.poolid = query + e.target.value;
            this.setState({ poolid: e.target.value });
        }

        if (query === "&ticker=") {
            queryParams.ticker = query + e.target.value;
            this.setState({ ticker: e.target.value });
        }

        if (query === "&name=") {
            queryParams.name = query + e.target.value;
            this.setState({ name: e.target.value });
        }

        var allQueryParams = "";
        this.mapObject(queryParams, function (key, value) {
            if (value !== "") {
                allQueryParams += value;
            }
        })
        this.state.searchQuery = allQueryParams;
        this.getPoolList(this.state.baseUrl + this.state.searchQuery);
    }

    handlePageClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
        this.getPoolList(this.state.baseUrl + this.state.searchQuery + "&page=" + index);
    }

    async componentDidMount() {
        this.getPoolList(this.state.baseUrl);
    }

    async getPoolList(query) {
        var response = await fetch(query);
        // const response = await fetch(this.state.baseUrl + this.state.searchQuery);
        const data = await response.json();
        this.setState({ pools: data.poolpeek.pools, loading: true })
        this.setState({ query: data.poolpeek.query, loading: true })
        this.setState({ pageCount: data.poolpeek.query.pageCount, loading: false })
    }

    mapObject(object, callback) {
        return Object.keys(object).map(function (key) {
            return callback(key, object[key]);
        });
    }

    render() {
        const { currentPage, pageCount } = this.state;

        if (this.state.loading) {
            return <div>loading...</div>
        }

        if (!this.state.pools) {
            return <div>Pools not found...</div>
        }

        return (

            <div className="container-fluid" style={{ align: "left", width: "99%" }}>

                <Scroll showBelow={250} />

                <Form inline className="cr-search-form">
                    <Input
                        type="text"
                        className="cr-search-form__input"
                        placeholder="PoolID...."
                        // onChange={this.handleChange("&poolid=")}
                        onChange={this.handleChange("&poolid=")}
                        value={this.state.poolid}
                    />
                </Form>
                <Form inline className="cr-search-form">
                    <Input
                        type="text"
                        className="cr-search-form__input"
                        placeholder="Ticker...."
                        onChange={this.handleChange("&ticker=")}
                        value={this.state.ticker}
                    />
                </Form>
                <Form inline className="cr-search-form">
                    <Input
                        type="text"
                        className="cr-search-form__input"
                        placeholder="Name...."
                        onChange={this.handleChange("&name=")}
                        value={this.state.name}
                    />
                </Form>
                <br />
                <h2>Results:</h2>
                <p> Total pools: {this.state.query.count}.</p>
                <p> Displaying {this.state.pools.length} pools per pags.</p>


                <Pagination style={{ align: "left", width: "90%" }}>
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                            onClick={e => this.handlePageClick(e, currentPage - 1)}
                            previous
                            href="#"
                        />
                    </PaginationItem>

                    {_.times(pageCount, (i) =>
                        <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink onClick={e => this.handlePageClick(e, i)} href="#">
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= pageCount - 1}>
                        <PaginationLink
                            onClick={e => this.handlePageClick(e, currentPage + 1)}
                            next
                            href="#"
                        />
                    </PaginationItem>
                </Pagination>

                <Row>
                    <Col>
                        <Pool pools={this.state.pools} />
                    </Col>
                </Row>

            </div>
        );
    }
}