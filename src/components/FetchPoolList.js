import React from 'react';
import { Col, Row, Form, Input, Pagination, PaginationItem, PaginationLink, Table, Button } from 'reactstrap';
import _ from 'lodash';

import Scroll from '../components/Scroll'
import Pool from 'components/Pool';

import { Collapse } from 'react-collapse';
import { FormGroup, FormControlLabel, Switch, Checkbox } from '@material-ui/core';
const WAIT_INTERVAL = 500
let queryParams = {
    "poolid": "",
    "ticker": "",
    "name": "",
    "description": "",
    "blockfrom": "",
    "blockto": "",
    "marginfrom": "",
    "marginto": "",
    "pledgefrom": "",
    "pledgeto": "",
    "costfrom": "",
    "costto": "",
    "activestakefrom": "",
    "activestaketo": ""
};

let orderBy;

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
            baseQuery: "",
            searchQuery: "",
            currentPage: 0,
            pageCount: 0,
            //search params
            poolid: "",
            ticker: "",
            name: "",
            description: "",
            blockfrom: "",
            blockto: "",
            marginfrom: "",
            marginto: "",
            pledgefrom: "",
            pledgeto: "",
            costfrom: "",
            costto: "",
            activestakefrom: "",
            activestaketo: "",
            //end search params
            advancedSearchFiltersShow: false,
            //order by types
            tickerOrder: false,
            pledgeOrder: false,
            activeStakeOrder: false,
            blocksOrder: false,
            marginOrder: false,
            ascendingOrder: true
            //end order by types


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

        if (query === "&description=") {
            queryParams.description = query + e.target.value;
            this.setState({ description: e.target.value });
        }

        if (query === "&blockfrom=") {
            queryParams.blockfrom = query + e.target.value;
            this.setState({ blockfrom: e.target.value });
        }
        if (query === "&blockto=") {
            queryParams.blockto = query + e.target.value;
            this.setState({ blockto: e.target.value });
        }

        if (query === "&marginfrom=") {
            queryParams.marginfrom = query + e.target.value;
            this.setState({ marginfrom: e.target.value });
        }
        if (query === "&marginto=") {
            queryParams.marginto = query + e.target.value;
            this.setState({ marginto: e.target.value });
        }

        if (query === "&pledgefrom=") {
            queryParams.pledgefrom = query + e.target.value;
            this.setState({ pledgefrom: e.target.value });
        }
        if (query === "&pledgeto=") {
            queryParams.pledgeto = query + e.target.value;
            this.setState({ pledgeto: e.target.value });
        }

        if (query === "&costfrom=") {
            queryParams.costfrom = query + e.target.value;
            this.setState({ costfrom: e.target.value });
        }
        if (query === "&costto=") {
            queryParams.costto = query + e.target.value;
            this.setState({ costto: e.target.value });
        }

        if (query === "&activestakefrom=") {
            queryParams.activestakefrom = query + e.target.value;
            this.setState({ activestakefrom: e.target.value });
        }
        if (query === "&activestaketo=") {
            queryParams.activestaketo = query + e.target.value;
            this.setState({ activestaketo: e.target.value });
        }

        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout((e) => {

            var allQueryParams = "";
            this.mapObject(queryParams, function (key, value) {
                if (value !== "") {
                    allQueryParams += value;
                }
            })

            if (allQueryParams) {
                this.state.searchQuery = allQueryParams;
                this.getPoolList(this.state.baseUrl + this.state.baseQuery + this.state.searchQuery);
            }
        }, WAIT_INTERVAL);
    }

    handlePageClick(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });

        var u = this.state.baseUrl + this.state.baseQuery + this.state.searchQuery + "&page=" + parseInt(index + 1);
        this.getPoolList(u);
    }

    componentDidMount() {

        if (this.props.query) {
            this.state.baseQuery = this.props.query;
        }

        this.getPoolList(this.state.baseUrl + this.state.baseQuery);
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

    resetSearchFilters() {
        this.setState({ poolid: "" });
        this.setState({ ticker: "" });
        this.setState({ name: "" });
        this.setState({ blockfrom: "" });
        this.setState({ blockto: "" });
        this.setState({ description: "" });
        this.setState({ marginfrom: "" });
        this.setState({ marginto: "" });
        this.setState({ pledgefrom: "" });
        this.setState({ pledgeto: "" });
        this.setState({ costfrom: "" });
        this.setState({ costto: "" });
        this.setState({ activestakefrom: "" });
        this.setState({ activestaketo: "" });


        queryParams = queryParams = {
            "poolid": "",
            "ticker": "",
            "name": "",
            "description": "",
            "blockfrom": "",
            "blockto": "",
            "marginfrom": "",
            "marginto": "",
            "pledgefrom": "",
            "pledgeto": "",
            "costfrom": "",
            "costto": "",
            "activestakefrom": "",
            "activestaketo": ""
        }
    };

    handleAdvancedClick() {
        if (this.state.advancedSearchFiltersShow) {
            this.setState({ advancedSearchFiltersShow: false });
        }
        else {
            this.setState({ advancedSearchFiltersShow: true });
        }
    }

    handleOrderByClick(orderByType) {
        console.log("I was clicked" + orderByType);
        if (orderByType == "tickerOrder") {
            if (this.state.tickerOrder == false) {
                this.state.tickerOrder = true;
                this.setState({ tickerOrder: true });
            } else {
                this.state.tickerOrder = false;
                this.setState({ tickerOrder: false });
            }
        }
        else if (orderByType == "pledgeOrder") {
            if (this.state.pledgeOrder == false) {
                this.state.pledgeOrder = true;
                this.setState({ pledgeOrder: true });
            } else {
                this.state.pledgeOrder = false;
                this.setState({ pledgeOrder: false });
            }
        }
        else if (orderByType == "blocksOrder") {
            if (this.state.blocksOrder == false) {
                this.state.blocksOrder = true;
                this.setState({ blocksOrder: true });
            } else {
                this.state.blocksOrder = false;
                this.setState({ blocksOrder: false });
            }
        }
        else if (orderByType == "activeStakeOrder") {
            if (this.state.activeStakeOrder == false) {
                this.state.activeStakeOrder = true;
                this.setState({ activeStakeOrder: true });
            } else {
                this.state.activeStakeOrder = false;
                this.setState({ activeStakeOrder: false });
            }
        }
        else if (orderByType == "marginOrder") {
            if (this.state.marginOrder == false) {
                this.state.marginOrder = true;
                this.setState({ marginOrder: true });
            } else {
                this.state.marginOrder = false;
                this.setState({ marginOrder: false });
            }
        }

        if (orderByType == "ascendingOrder") {
            if (this.state.ascendingOrder == false) {
                this.state.ascendingOrder = true;
                this.setState({ ascendingOrder: true });
            } else {
                this.state.ascendingOrder = false;
                this.setState({ ascendingOrder: false });
            }
        }

        var orderByList = "";
        if (this.state.ascendingOrder == true) {
            if (this.state.tickerOrder == true) { orderByList += "Ticker,"; }
            if (this.state.pledgeOrder == true) { orderByList += "Pledge,"; }
            if (this.state.blocksOrder == true) { orderByList += "Blocks,"; }
            if (this.state.activeStakeOrder == true) { orderByList += "ActiveStake,"; }
            if (this.state.marginOrder == true) { orderByList += "Margin,"; }
        }
        else{
            if (this.state.tickerOrder == true) { orderByList += "TiTicker(z-a),"; }
            if (this.state.pledgeOrder == true) { orderByList += "Pledge(z-a),"; }
            if (this.state.blocksOrder == true) { orderByList += "Blocks(z-a),"; }
            if (this.state.activeStakeOrder == true) { orderByList += "ActiveStake(z-a),"; }
            if (this.state.marginOrder == true) { orderByList += "Margin(z-a),"; }
        }

        if (orderByList != "") {
            this.orderBy = "&order=" + orderByList;
            console.log(this.orderBy);

            if (this.state.searchQuery !== "") {
                this.getPoolList(this.state.baseUrl + this.state.baseQuery + this.state.searchQuery + this.orderBy);
            }
            else
                this.getPoolList(this.state.baseUrl + this.state.baseQuery + this.orderBy);
        } else {
            this.getPoolList(this.state.baseUrl + this.state.baseQuery + this.state.searchQuery);
            this.getPoolList(this.state.baseUrl + this.state.baseQuery);

            if (this.state.searchQuery !== "") {
                this.getPoolList(this.state.baseUrl + this.state.baseQuery + this.state.searchQuery);
            }
            else
                this.getPoolList(this.state.baseUrl + this.state.baseQuery);
        }
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
                <h3>Filters:</h3>
                <Table >
                    <tbody>
                        <tr>
                            <td scope="row" style={{ width: "30%" }}>
                                <Input
                                    style={{ fontSize: 14 }}
                                    type="text"
                                    className="cr-search-form__input"
                                    placeholder="Ticker...."
                                    onChange={this.handleChange("&ticker=")}
                                    value={this.state.ticker}
                                />
                            </td>
                            <th scope="row" style={{ align: "left", width: "30%", margin: "20px" }}>
                                <Input
                                    style={{ fontSize: 14 }}
                                    type="text"
                                    className="cr-search-form__input"
                                    placeholder="PoolID...."
                                    onChange={this.handleChange("&poolid=")}
                                    value={this.state.poolid}
                                />
                            </th>
                        </tr>
                        <tr>
                            <th scope="row" style={{ align: "left", width: "30%", margin: "20px" }}>
                                <Input
                                    style={{ fontSize: 14 }}
                                    type="text"
                                    className="cr-search-form__input"
                                    placeholder="Name...."
                                    onChange={this.handleChange("&name=")}
                                    value={this.state.name}
                                />
                            </th>
                            <td scope="row" style={{ width: "30%" }}>
                                <Input
                                    style={{ fontSize: 14 }}
                                    type="text"
                                    className="cr-search-form__input"
                                    placeholder="Description...."
                                    onChange={this.handleChange("&description=")}
                                    value={this.state.description}
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <FormGroup>
                    <h3>Advanced:</h3>
                    <FormControlLabel
                        control={<Switch size="Normal" checked={this.state.advancedSearchFiltersShow} color="black" onChange={e => this.handleAdvancedClick()} />}
                    />
                </FormGroup>

                <Collapse isOpened={this.state.advancedSearchFiltersShow}>
                    <Table >
                        <tbody>

                            <tr>
                                <th scope="row" style={{ align: "left", width: "30%", margin: "20px" }}>
                                    <Input
                                        style={{ fontSize: 13 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Produced Blocks From...."
                                        onChange={this.handleChange("&blockfrom=")}
                                        value={this.state.blockfrom}
                                    />
                                </th>
                                <td scope="row" style={{ width: "30%" }}>
                                    <Input
                                        style={{ fontSize: 13 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Produced Blocks To...."
                                        onChange={this.handleChange("&blockto=")}
                                        value={this.state.blockto}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row" style={{ align: "left", width: "30%", margin: "20px" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Pool Margin % From...."
                                        onChange={this.handleChange("&marginfrom=")}
                                        value={this.state.marginfrom}
                                    />
                                </th>
                                <td scope="row" style={{ width: "30%" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Pool Margin % To...."
                                        onChange={this.handleChange("&marginto=")}
                                        value={this.state.marginto}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row" style={{ align: "left", width: "30%", margin: "20px" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Pledge From...."
                                        onChange={this.handleChange("&pledgefrom=")}
                                        value={this.state.pledgefrom}
                                    />
                                </th>
                                <td scope="row" style={{ width: "30%" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Pledge To...."
                                        onChange={this.handleChange("&pledgeto=")}
                                        value={this.state.pledgeto}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row" style={{ align: "left", width: "30%", margin: "20px" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Cost From...."
                                        onChange={this.handleChange("&costfrom=")}
                                        value={this.state.costfrom}
                                    />
                                </th>
                                <td scope="row" style={{ width: "30%" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Cost To...."
                                        onChange={this.handleChange("&costto=")}
                                        value={this.state.costto}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <th scope="row" style={{ align: "left", width: "30%", margin: "20px" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Active Stake From...."
                                        onChange={this.handleChange("&activestakefrom=")}
                                        value={this.state.activestakefrom}
                                    />
                                </th>
                                <td scope="row" style={{ width: "30%" }}>
                                    <Input
                                        style={{ fontSize: 12 }}
                                        type="text"
                                        className="cr-search-form__input"
                                        placeholder="Active Stake To...."
                                        onChange={this.handleChange("&activestaketo=")}
                                        value={this.state.activestaketo}
                                    />
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                </Collapse>
                <Button color="secondary" onClick={() => this.resetSearchFilters()} type="submit">Reset Filters</Button>

                <FormGroup>
                    <br></br>
                    <h3>Orderby:</h3>
                    <label>
                        <Checkbox
                            checked={this.state.tickerOrder}
                            onChange={e => this.handleOrderByClick("tickerOrder")}
                        />
                        <span>Ticker</span>
                        <Checkbox
                            checked={this.state.pledgeOrder}
                            onChange={e => this.handleOrderByClick("pledgeOrder")} />
                        <span>Pledge</span>
                        <Checkbox
                            checked={this.state.activeStakeOrder}
                            onChange={e => this.handleOrderByClick("activeStakeOrder")} />
                        <span>Active Stake</span>
                        <Checkbox
                            checked={this.state.blocksOrder}
                            onChange={e => this.handleOrderByClick("blocksOrder")} />
                        <span>Blocks</span>
                        <Checkbox
                            checked={this.state.marginOrder}
                            onChange={e => this.handleOrderByClick("marginOrder")} />
                        <span>Margin</span>
                    </label>
                </FormGroup>
                <FormGroup>
                    <label>
                        <Checkbox
                            checked={this.state.ascendingOrder}
                            onChange={e => this.handleOrderByClick("ascendingOrder")}
                        />
                        <span>Ascending Order</span>
                    </label>
                </FormGroup>

                <br />
                <p> Total pools: {this.state.query.count}, Displaying {this.state.pools.length}</p>

                <Pagination style={{ align: "left", width: "82%" }}>
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

            </div >
        );
    }
}