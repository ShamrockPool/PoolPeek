import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';
import CardanoImage from 'assets/img/cardanoIcon.png';

import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const detailsStyle = { margin: "200px" };

export default class PoolV2 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.pools.map(function (item, key) {
                return (
                    <div key={key} style={{ alignItems: "center" }}>
                        <Card style={{ width: "60%", margin: "20px", alignItems: "center" }}>
                            <CardHeader >
                            <img
                                src={CardanoImage}
                                className="pr-2"
                                alt=""
                                width="25"
                                height="25"
                            />{item.name}</CardHeader>
                            <CardBody style={{ width: "90%" }}>
                                <TableRow>
                                    <Col>
                                        <Card body>
                                            <p>{item.description}</p>
                                            <MaUTable style={{ width: "55%" }}>
                                                <TableBody>
                                                    <TableRow>
                                                        <Tooltip
                                                            title="The pool ticker"
                                                            placement="left"
                                                        >
                                                            <th scope="row">Ticker</th></Tooltip>
                                                        <td>{item.ticker}</td>
                                                    </TableRow>
                                                    <TableRow>
                                                        <Tooltip
                                                            title="The ID of the pool."
                                                            placement="left"
                                                        >
                                                            <th scope="row">Pool Id</th></Tooltip>
                                                        <td>{item.pool_id}</td>
                                                    </TableRow>
                                                    <TableRow>
                                                        <Tooltip
                                                            title="The website of the pool."
                                                            placement="left"
                                                        >
                                                            <th scope="row">Website</th></Tooltip>
                                                        <td><a href={item.homepage} target="_blank" rel="noreferrer">{item.homepage}</a></td>
                                                    </TableRow>
                                                    <TableRow>
                                                        <Tooltip
                                                            title="The number of blocks this pool has minted."
                                                            placement="left"
                                                        >
                                                            <th scope="row" style={detailsStyle}>Produced Blocks</th></Tooltip>
                                                        <td>{item.blocks}</td>
                                                    </TableRow>
                                                    <TableRow>
                                                        <Tooltip
                                                            title="Important pool information"
                                                            placement="left"
                                                        >
                                                            <th scope="row">Pool Info</th></Tooltip>
                                                        <td>Pool margin: {item.margin_pct}%    Pledge: {item.pledge} ₳     Cost per epoch: {item.cost_per_epoch} ₳</td>
                                                    </TableRow>
                                                    <TableRow><Tooltip
                                                        title="Stake is the amount of ADA delegated to the pool."
                                                        placement="left"
                                                    >
                                                        <th scope="row">Stake</th></Tooltip>
                                                        <td>Active Stake: {item.active_stake} ₳     Delegators: {item.active_stake_delegator_count}</td>
                                                    </TableRow>
                                                    <TableRow>
                                                        <Tooltip
                                                            title="Sites containing more information on the pool."
                                                            placement="left"
                                                        >
                                                            <th scope="row">External Sites</th></Tooltip>
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
                                                    </TableRow>
                                                </TableBody>
                                            </MaUTable>
                                        </Card>
                                    </Col>
                                </TableRow>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        )
    };
};

