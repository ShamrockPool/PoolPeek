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
        return (

            this.props.block_history.map(function (item, key) {
                return (
                    <tbody>
                        <tr>
                            <td style={tableRowStyle} scope="row">{item.blocks_epoch}</td>
                            <td style={tableRowStyle} scope="row">{item.blocks}</td>
                        </tr>
                    </tbody>
                )
            })
        )
    };
};

