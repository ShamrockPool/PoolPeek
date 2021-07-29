import React, { useState } from 'react';
import "../../styles/components/Table.css";

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional


const tableRowStyle = {
    // borderBottom: 'solid 3px blue',
    // background: 'green',
    // color: 'white',
    fontWeight: 'bold',
    paddingLeft: 20,
};

export default class PoolBlocksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    componentDidMount() {
    }

    render() {
        var currentEpoch = this.props.currentEpoch;
        return (

            this.props.block_history.map(function (item, key) {
                return (
                    <tbody>
                        <tr>
                            {key == 0 ? <td style={tableRowStyle} scope="row">{item.blocks_epoch}*</td> :
                                <td style={tableRowStyle} scope="row">{item.blocks_epoch}</td>}
                            <td style={tableRowStyle} scope="row">{item.active_stake}</td>
                            <td style={tableRowStyle} scope="row">{item.expected_blocks}</td>
                            <td style={tableRowStyle} scope="row">{item.blocks}</td>
                            <td style={tableRowStyle} scope="row">{item.luck}</td>
                        </tr>
                    </tbody>

                )
            })

        )
    };
};

