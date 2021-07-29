import React, { useState } from 'react';
import { Input, Pagination, PaginationItem, PaginationLink, Table, Button, Col, Row } from 'reactstrap';
import _ from 'lodash';
import { isEmpty } from 'utils/stringutil.js';
import Scroll from '../Scroll';
import Pool from 'components/pool/Pool';
import { Collapse } from 'react-collapse';
import { FormGroup, FormControlLabel, Switch, Checkbox } from '@material-ui/core';
import { css } from "@emotion/core";
import CircleLoader
    from "react-spinners/CircleLoader";
import ReactPaginate from 'react-paginate';
import 'styles/pagination.css';

import PoolCard from 'components/Card/PoolCard';

import { baseUrl, allPools, baseUrlPoolPeekService, allPoolsPPS } from '../../assets/services';

const WAIT_INTERVAL = 2000

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
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
    "activestaketo": "",
    "location": ""
};

const sid = Math.floor(Math.random() * 100) + Date.now()


export default class FetchPoolList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: null,
            loading: true,
            pools: [],
            query: null,
            baseQuery: "",
            searchQuery: "",
            currentPage: 0,
            pageCount: 0,
            //search params
            poolid: null,
            ticker: null,
            name: null,
            description: null,
            blockfrom: null,
            blockto: null,
            marginfrom: null,
            marginto: null,
            pledgefrom: null,
            pledgeto: null,
            costfrom: null,
            costto: null,
            activestakefrom: null,
            activestaketo: null,
            multiPoolOperators: false,
            saturatedPools: false,
            location: null,
            //end search params
            advancedSearchFiltersShow: false,
            orderByFiltersShow: false,
            //order by types
            tickerOrder: false,
            pledgeOrder: false,
            activeStakeOrder: false,
            blocksOrder: false,
            marginOrder: false,
            tickerOrderDescending: false,
            pledgeOrderDescending: false,
            activeStakeOrderDescending: false,
            blocksOrderDescending: false,
            marginOrderDescending: false,
            ascendingOrderDescending: true,
            //end order by types
            showFilters: true,
            filtersWhereRemoved: false,

            //new querymap
            queryMap: [],
            allpoolsList: null,
            poolsToDisplay: null,
            pageSelected: ""

        };
    }
    //be7e2461a584b6532c972edca711fa466d7d0e8a86b6629fc0784ff6
    handleChange = (query) => (e) => {
        if (query === "&poolid=") {
            this.setState({ poolid: e.target.value });
        }
        if (query === "&ticker=") {
            this.setState({ ticker: e.target.value });
        }
        if (query === "&name=") {
            this.setState({ name: e.target.value });
        }
        if (query === "&description=") {
            this.setState({ description: e.target.value });
        }
        if (query === "&blockfrom=") {
            this.setState({ blockfrom: e.target.value });
        }
        if (query === "&blockto=") {
            this.setState({ blockto: e.target.value });
        }
        if (query === "&marginfrom=") {
            this.setState({ marginfrom: e.target.value });
        }
        if (query === "&marginto=") {
            this.setState({ marginto: e.target.value });
        }
        if (query === "&pledgefrom=") {
            this.setState({ pledgefrom: e.target.value });
        }
        if (query === "&pledgeto=") {
            this.setState({ pledgeto: e.target.value });
        }

        if (query === "&costfrom=") {
            this.setState({ costfrom: e.target.value });
        }
        if (query === "&costto=") {
            this.setState({ costto: e.target.value });
        }

        if (query === "&activestakefrom=") {
            this.setState({ activestakefrom: e.target.value });
        }
        if (query === "&activestaketo=") {
            this.setState({ activestaketo: e.target.value });
        }

        if (query === "&location=") {
            this.state.location = e.target.value;
            this.setState({ location: e.target.value });
        }

        clearTimeout(this.inputTimer);
        this.inputTimer = setTimeout((e) => {
            this.performPoolListFilter();
        }, 400);

    }

    performPoolListFilter() {
        var poolsToDisplay = this.state.allpoolsList;

        if (this.state.poolid) {
            poolsToDisplay = poolsToDisplay.filter(pool => pool.pool_id == this.state.poolid);
        }

        if (this.state.ticker) {
            poolsToDisplay = poolsToDisplay.filter(pool => pool.ticker.toLowerCase().includes(this.state.ticker.toLowerCase()));
        }

        if (this.state.name) {
            poolsToDisplay = poolsToDisplay.filter(pool => pool.name.toLowerCase().includes(this.state.name.toLowerCase()));
        }

        if (this.state.description) {
            poolsToDisplay = poolsToDisplay.filter(pool => pool.description.toLowerCase().includes(this.state.description.toLowerCase()));
        }

        if (this.state.blockfrom) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.blocks) >= this.state.blockfrom);
        }
        if (this.state.blockto) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.blocks) <= this.state.blockto);
        }

        if (this.state.marginfrom) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.margin_pct.replaceAll(',', '')) >= this.state.marginfrom);
        }
        if (this.state.marginto) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.margin_pct.replaceAll(',', '')) <= this.state.marginto);
        }

        if (this.state.pledgefrom) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.pledge.replaceAll(',', '')) >= this.state.pledgefrom);
        }
        if (this.state.pledgeto) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.pledge.replaceAll(',', '')) <= this.state.pledgeto);
        }

        if (this.state.costfrom) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.cost_per_epoch.replaceAll(',', '')) >= this.state.costfrom);
        }
        if (this.state.costto) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.cost_per_epoch.replaceAll(',', '')) <= this.state.costto);
        }

        if (this.state.activestakefrom) {
            poolsToDisplay = poolsToDisplay.filter(pool => pool.active_stake != null && Number(pool.active_stake.replaceAll(',', '')) >= this.state.activestakefrom);
        }
        if (this.state.activestaketo) {
            poolsToDisplay = poolsToDisplay.filter(pool => pool.active_stake != null && Number(pool.active_stake.replaceAll(',', '')) <= this.state.activestaketo);
        }

        if (this.state.location) {
            var location = this.state.location;
            poolsToDisplay = poolsToDisplay.filter(function (pool) {
                try {
                    if (!isEmpty(pool.extended_meta.location)) {
                        if (pool.extended_meta.location.toLowerCase().includes(location.toLowerCase())) {
                            return pool;
                        }
                    }
                } catch (error) {
                }
            });
        }

        if (this.state.multiPoolOperators == true) {
            poolsToDisplay = poolsToDisplay.filter(pool => pool.pool_splitter == "0");
        }

        if (this.state.saturatedPools == true) {
            poolsToDisplay = poolsToDisplay.filter(pool => Number(pool.live_stake.replace(',', '')) <= 63786161.16);
        }

        this.state.poolsToDisplay = poolsToDisplay;
        this.setState({ pageCount: poolsToDisplay.length / 30 });

        if(this.state.pageSelected != ""){
            poolsToDisplay = poolsToDisplay.slice(this.state.pageSelected * 30);
        }
        this.setState({ poolsToDisplay: poolsToDisplay });
    }

    handlePageClick = (data) => {
        this.state.pageSelected = data.selected;
        this.setState({ pageSelected: data.selected });
        this.performPoolListFilter();
    };

    async componentDidMount() {
        await this.getAllPools();
        this.setState({ allpoolsList: this.shuffle(this.state.allpoolsList) });

        try {
            if (!isEmpty(this.props.match.params.location)) {
                this.state.location = this.props.match.params.location;
                this.setState({ location: this.props.match.params.location });
            }
        } catch (error) { }


        if (this.props.multiPoolOperators == true) {
            this.state.multiPoolOperators = this.props.multiPoolOperators;
            this.setState({ multiPoolOperators: this.props.multiPoolOperators });
        }

        if (!isEmpty(this.props.poolid)) {
            this.state.poolid = this.props.poolid;
            this.setState({ poolid: this.props.poolid });
        }

        this.performPoolListFilter();

        if (this.state.filtersWhereRemoved == false) {
            this.showFilters(this.state.poolsToDisplay.length);
        }
        this.setState({ loading: false });
    }

    async getAllPools() {
        var response = await fetch(baseUrlPoolPeekService + allPoolsPPS);
        var data = await response.json();
        console.log(data);

        this.setState({ allpoolsList: data.pools });
        this.setState({ pageCount: data.pools.length / 30 });
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
        this.setState({ location: "" });

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
            "activestaketo": "",
            "location": ""
        }
    };

    handleMultiPoolOperatorsClick() {
        if (this.state.multiPoolOperators) {
            this.setState({ multiPoolOperators: false });
            this.state.multiPoolOperators = false;
        }
        else {
            this.setState({ multiPoolOperators: true });
            this.state.multiPoolOperators = true;
        }

        this.performPoolListFilter();

    }

    handleSaturatedPoolsClick() {
        if (this.state.saturatedPools) {
            this.setState({ saturatedPools: false });
            this.state.saturatedPools = false;
        }
        else {
            this.setState({ saturatedPools: true });
            this.state.saturatedPools = true;
        }

        this.performPoolListFilter();
    }

    handleAdvancedClick() {
        if (this.state.advancedSearchFiltersShow) {
            this.setState({ advancedSearchFiltersShow: false });
        }
        else {
            this.setState({ advancedSearchFiltersShow: true });
        }
    }

    handleOrderByToggleClick() {
        if (this.state.orderByFiltersShow) {
            this.setState({ orderByFiltersShow: false });
        }
        else {
            this.setState({ orderByFiltersShow: true });
        }
    }

    clearOrderChecks(orderByType) {
        if (orderByType != "tickerOrder") {
            this.state.tickerOrder = false;
            this.setState({ tickerOrder: false });
        }

        if (orderByType != "pledgeOrder") {
            this.state.pledgeOrder = false;
            this.setState({ pledgeOrder: false });
        }

        if (orderByType != "blocksOrder") {
            this.state.blocksOrder = false;
            this.setState({ blocksOrder: false });
        }

        if (orderByType != "activeStakeOrder") {
            this.state.activeStakeOrder = false;
            this.setState({ activeStakeOrder: false });
        }

        if (orderByType != "marginOrder") {
            this.state.marginOrder = false;
            this.setState({ marginOrder: false });
        }

        if (orderByType != "tickerOrderDescending") {
            this.state.tickerOrderDescending = false;
            this.setState({ tickerOrderDescending: false });
        }

        if (orderByType != "pledgeOrderDescending") {
            this.state.pledgeOrderDescending = false;
            this.setState({ pledgeOrderDescending: false });
        }

        if (orderByType != "blocksOrderDescending") {
            this.state.blocksOrderDescending = false;
            this.setState({ blocksOrderDescending: false });
        }

        if (orderByType != "activeStakeOrderDescending") {
            this.state.activeStakeOrderDescending = false;
            this.setState({ activeStakeOrderDescending: false });
        }

        if (orderByType != "marginOrderDescending") {
            this.state.marginOrderDescending = false;
            this.setState({ marginOrderDescending: false });
        }
    }

    handleOrderByClick(orderByType) {

        this.clearOrderChecks(orderByType);

        if (orderByType == "tickerOrder" || orderByType == "tickerOrderDescending") {
            if (orderByType == "tickerOrder") {
                if (this.state.tickerOrder == false) {
                    this.state.tickerOrder = true;
                    this.setState({ tickerOrder: true });

                    this.state.tickerOrderDescending = false;
                    this.setState({ tickerOrderDescending: false });
                } else {
                    this.state.tickerOrder = false;
                    this.setState({ tickerOrder: false });
                }
            }
            else {
                if (this.state.tickerOrderDescending == false) {
                    this.state.tickerOrderDescending = true;
                    this.setState({ tickerOrderDescending: true });

                    this.state.tickerOrder = false;
                    this.setState({ tickerOrder: false });
                } else {
                    this.state.tickerOrderDescending = false;
                    this.setState({ tickerOrderDescending: false });
                }
            }
        }

        else if (orderByType == "pledgeOrder" || orderByType == "pledgeOrderDescending") {
            if (orderByType == "pledgeOrder") {
                if (this.state.pledgeOrder == false) {
                    this.state.pledgeOrder = true;
                    this.setState({ pledgeOrder: true });

                    this.state.pledgeOrderDescending = false;
                    this.setState({ pledgeOrderDescending: false });
                } else {
                    this.state.pledgeOrder = false;
                    this.setState({ pledgeOrder: false });
                }
            }
            else {
                if (this.state.pledgeOrderDescending == false) {
                    this.state.pledgeOrderDescending = true;
                    this.setState({ pledgeOrderDescending: true });

                    this.state.pledgeOrder = false;
                    this.setState({ pledgeOrder: false });
                } else {
                    this.state.pledgeOrderDescending = false;
                    this.setState({ pledgeOrderDescending: false });
                }
            }
        }
        else if (orderByType == "blocksOrder" || orderByType == "blocksOrderDescending") {
            if (orderByType == "blocksOrder") {
                if (this.state.blocksOrder == false) {
                    this.state.blocksOrder = true;
                    this.setState({ blocksOrder: true });

                    this.state.blocksOrderDescending = false;
                    this.setState({ blocksOrderDescending: false });
                } else {
                    this.state.blocksOrder = false;
                    this.setState({ blocksOrder: false });
                }
            } else {
                if (this.state.blocksOrderDescending == false) {
                    this.state.blocksOrderDescending = true;
                    this.setState({ blocksOrderDescending: true });

                    this.state.blocksOrder = false;
                    this.setState({ blocksOrder: false });
                } else {
                    this.state.blocksOrderDescending = false;
                    this.setState({ blocksOrderDescending: false });
                }
            }
        }

        else if (orderByType == "activeStakeOrder" || orderByType == "activeStakeOrderDescending") {
            if (orderByType == "activeStakeOrder") {
                if (this.state.activeStakeOrder == false) {
                    this.state.activeStakeOrder = true;
                    this.setState({ activeStakeOrder: true });

                    this.state.activeStakeOrderDescending = false;
                    this.setState({ activeStakeOrderDescending: false });
                } else {
                    this.state.activeStakeOrder = false;
                    this.setState({ activeStakeOrder: false });
                }
            }
            else {
                if (this.state.activeStakeOrderDescending == false) {
                    this.state.activeStakeOrderDescending = true;
                    this.setState({ activeStakeOrderDescending: true });

                    this.state.activeStakeOrder = false;
                    this.setState({ activeStakeOrder: false });
                } else {
                    this.state.activeStakeOrderDescending = false;
                    this.setState({ activeStakeOrderDescending: false });
                }
            }
        }
        else if (orderByType == "marginOrder" || orderByType == "marginOrderDescending") {
            if (orderByType == "marginOrder") {
                if (this.state.marginOrder == false) {
                    this.state.marginOrder = true;
                    this.setState({ marginOrder: true });

                    this.state.marginOrderDescending = false;
                    this.setState({ marginOrderDescending: false });
                } else {
                    this.state.marginOrder = false;
                    this.setState({ marginOrder: false });
                }
            } else {
                if (this.state.marginOrderDescending == false) {
                    this.state.marginOrderDescending = true;
                    this.setState({ marginOrderDescending: true });

                    this.state.marginOrder = false;
                    this.setState({ marginOrder: false });
                } else {
                    this.state.marginOrderDescending = false;
                    this.setState({ marginOrderDescending: false });
                }
            }

        }


        var orderByList = "";
        if (this.state.tickerOrder == true) { orderByList += "Ticker,"; }
        if (this.state.pledgeOrder == true) { orderByList += "Pledge,"; }
        if (this.state.blocksOrder == true) { orderByList += "Blocks,"; }
        if (this.state.activeStakeOrder == true) { orderByList += "ActiveStake,"; }
        if (this.state.marginOrder == true) { orderByList += "Margin,"; }
        if (this.state.tickerOrderDescending == true) { orderByList += "Ticker(z-a),"; }
        if (this.state.pledgeOrderDescending == true) { orderByList += "Pledge(z-a),"; }
        if (this.state.blocksOrderDescending == true) { orderByList += "Blocks(z-a),"; }
        if (this.state.activeStakeOrderDescending == true) { orderByList += "ActiveStake(z-a),"; }
        if (this.state.marginOrderDescending == true) { orderByList += "Margin(z-a),"; }


        if (orderByList != "") {
            this.orderBy = "&order=" + orderByList;

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

    showFilters(poolsize) {
        if (poolsize < 5 && this.props.query !== undefined) {
            this.state.showFilters = false;
            this.setState({ showFilters: false });

            this.state.filtersWhereRemoved = true;
        }
    }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    render() {
        const { currentPage, pageCount } = this.state;

        return (

            <div className="container-fluid" style={{ align: "left", width: "100%", margin: "0px" }}>
                <Scroll showBelow={250} />
                {this.state.showFilters &&
                    <div>
                        <h3><b>Filters:</b></h3>
                        <h3 style={{ marginTop: "-30px", marginRight: "10px", align: "left", display: 'inline-block' }}><b>Advanced:</b>&nbsp;&nbsp;
                            <FormControlLabel style={{ align: "left", display: 'inline-block' }} value="all"
                                control={<Switch size="medium" checked={this.state.advancedSearchFiltersShow} onChange={e => this.handleAdvancedClick()}
                                />}
                            />
                        </h3>
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
                                            placeholder="Location...."
                                            onChange={this.handleChange("&location=")}
                                            value={this.state.location}
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
                                    <tr>
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
                                        <td></td>
                                    </tr>

                                </tbody>
                            </Table>

                            <Button color="secondary" onClick={() => this.resetSearchFilters()} type="submit">Reset Filters</Button>
                            {/* <br /><br />
                            <h3><b>Order by:</b></h3>
                            <FormControlLabel
                                control={<Switch size="medium" checked={this.state.orderByFiltersShow} onChange={e => this.handleOrderByToggleClick()} />}
                            />
                            <Collapse isOpened={this.state.orderByFiltersShow}>
                                <FormGroup>
                                    <label>
                                        <span><b>Ascending:</b></span>
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
                                        <span><b>Descending:</b></span>
                                        <Checkbox
                                            checked={this.state.tickerOrderDescending}
                                            onChange={e => this.handleOrderByClick("tickerOrderDescending")}
                                        />
                                        <span>Ticker</span>
                                        <Checkbox
                                            checked={this.state.pledgeOrderDescending}
                                            onChange={e => this.handleOrderByClick("pledgeOrderDescending")} />
                                        <span>Pledge</span>
                                        <Checkbox
                                            checked={this.state.activeStakeOrderDescending}
                                            onChange={e => this.handleOrderByClick("activeStakeOrderDescending")} />
                                        <span>Active Stake</span>
                                        <Checkbox
                                            checked={this.state.blocksOrderDescending}
                                            onChange={e => this.handleOrderByClick("blocksOrderDescending")} />
                                        <span>Blocks</span>
                                        <Checkbox
                                            checked={this.state.marginOrderDescending}
                                            onChange={e => this.handleOrderByClick("marginOrderDescending")} />
                                        <span>Margin</span>
                                    </label>
                                </FormGroup>
                            </Collapse>*/}
                        </Collapse> 

                        <div className="container-fluid" style={{ align: "left", display: 'inline-block' }}>
                            <span>Hide Multi Pool Operators</span>
                            <Checkbox checked={this.state.multiPoolOperators}
                                onChange={e => this.handleMultiPoolOperatorsClick()} />
                            <span>Hide Saturated Pools</span>
                            <Checkbox checked={this.state.saturatedPools}
                                onChange={e => this.handleSaturatedPoolsClick()} />

                            {(this.state.query && this.state.query.count > 10) && (
                                <span> <b>Total pools:</b> {this.state.query.count}, <b>Displaying:</b> {this.state.poolsToDisplay.length}    </span>)}
                        </div>

                    </div>}
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
                <Row>
                    {this.state.loading ? <div>Loading pools...<CircleLoader color={'#45b649'} loading={this.state.loading} css={override} size={180} /></div>
                        :
                        this.state.poolsToDisplay.map(function (item, key) {
                            if (key > 30) return;
                            return (

                                <Col lg={3} md={12} sm={12} xs={12} className="mb-3">
                                    <div className='ProjectCards'>
                                        <PoolCard
                                            img={item.imageUrl}
                                            pool={item} />
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>

            </div >
        );
    }
}