import React, { useState } from 'react';
import "../../styles/components/Table.css";

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional

const width = window.innerWidth;

const tableRowStyle = {
    // borderBottom: 'solid 3px blue',
    // background: 'green',
    // color: 'white',
    fontWeight: 'bold',
    paddingLeft: 20,
};

export default class PoolCostsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    componentDidMount() {
    }

    render() {

        return (

            this.props.costs_history.map(function (item, key) {
                return (
                    <tbody>
                       <tr>
                            <td style={tableRowStyle} scope="row">{item.active_epoch_no}</td>
                            <td style={tableRowStyle} scope="row">{item.margin}</td>
                            <td style={tableRowStyle} scope="row">{item.fixed_cost}</td>
                        </tr>
                    </tbody>

                )
            })

        )
    };
};

