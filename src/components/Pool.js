import React from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import Tooltip from "@material-ui/core/Tooltip";
import PooltoolImage from 'assets/img/pooltool.png_thumb';
import PoolPmImage from 'assets/img/poolpm.png_thumb';
import AdaPoolImage from 'assets/img/adapools.png_thumb';
import CardanoImage from 'assets/img/cardanoIcon.png';
import "../styles/components/Table.css";

export default class Pool extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            this.props.pools.map(function (item, key) {
                return (
                    <div key={key} style={{ alignItems: "center" }}>
                        <Card style={{ width: "100%", margin: "20px"}}>
                            <CardHeader >                            
                            <img
                                src={CardanoImage}
                                className="pr-2"
                                alt=""
                                width="25"
                                height="25"
                            />{item.name}</CardHeader>
                            <CardBody>
                                <Row>
                                    <Col>
                                        <Card body>
                                            <p>{item.description}</p>
                                            <Table {...{ ['striped']: true }}>
                                                <tbody>
                                                    <tr>
                                                        <Tooltip
                                                            title="The pool ticker"
                                                            placement="left"
                                                        >
                                                            <th style={{ width: "10px", margin: "20px"}}>Ticker</th>
                                                            </Tooltip>
                                                        <td>{item.ticker}</td>
                                                    </tr>
                                                    <tr>
                                                        <Tooltip
                                                            title="The ID of the pool."
                                                            placement="left"
                                                        >
                                                            <th scope="row">Pool Id</th></Tooltip>
                                                        <td>{item.pool_id}</td>
                                                    </tr>
                                                    <tr>
                                                        <Tooltip
                                                            title="The website of the pool."
                                                            placement="left"
                                                        >
                                                            <th scope="row">Website</th></Tooltip>
                                                        <td><a href={item.homepage} target="_blank" rel="noreferrer">{item.homepage}</a></td>
                                                    </tr>
                                                    <tr>
                                                        <Tooltip
                                                            title="The number of blocks this pool has minted."
                                                            placement="left"
                                                        >
                                                            <th scope="row">Produced Blocks</th></Tooltip>
                                                        <td>{item.blocks}</td>
                                                    </tr>
                                                    <tr>
                                                        <Tooltip
                                                            title="Important pool information"
                                                            placement="left"
                                                        >
                                                            <th scope="row">Pool Info</th></Tooltip>
                                                        <td>Pool margin: {item.margin_pct}%    Pledge: {item.pledge} ₳     Cost per epoch: {item.cost_per_epoch} ₳</td>
                                                    </tr>
                                                    <tr><Tooltip
                                                        title="Stake is the amount of ADA delegated to the pool."
                                                        placement="left"
                                                    >
                                                        <th scope="row">Stake</th></Tooltip>
                                                        <td>Active Stake: {item.active_stake} ₳     Delegators: {item.active_stake_delegator_count}</td>
                                                    </tr>
                                                    <tr>
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
            })
        )
    };
};

