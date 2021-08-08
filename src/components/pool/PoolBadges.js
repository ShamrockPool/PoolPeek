import React, { useState } from 'react';
import { Media } from 'reactstrap';
import blocks_1 from 'assets/img/poolbadges/blocks_1.png';
import blocks_5 from 'assets/img/poolbadges/blocks_5.png';
import blocks_10 from 'assets/img/poolbadges/blocks_10.png';
import blocks_25 from 'assets/img/poolbadges/blocks_25.png';
import blocks_50 from 'assets/img/poolbadges/blocks_50.png';
import blocks_100 from 'assets/img/poolbadges/blocks_100.png';
import blocks_200 from 'assets/img/poolbadges/blocks_200.png';
import blocks_250 from 'assets/img/poolbadges/blocks_250.png';
import blocks_500 from 'assets/img/poolbadges/blocks_500.png';
import blocks_1000 from 'assets/img/poolbadges/blocks_1000.png';
import blocks_1500 from 'assets/img/poolbadges/blocks_1500.png';
import blocks_2000 from 'assets/img/poolbadges/blocks_2000.png';
import blocks_3000 from 'assets/img/poolbadges/blocks_3000.png';
import blocks_4000 from 'assets/img/poolbadges/blocks_4000.png';
import blocks_5000 from 'assets/img/poolbadges/blocks_5000.png';

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;


const badgeWidth = 200;

export default class PoolBadges extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delegatesList: null,
            loading: true,
        };

    }

    componentDidMount() {

    }


    render() {
        return (
            <div style={{ width: "100%", alignItems: "left" }}>

                {Number(this.props.poolBlocksTotal) > 4999 && <Media
                    object
                    src={blocks_5000}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}
                {Number(this.props.poolBlocksTotal) > 3999 && <Media
                    object
                    src={blocks_4000}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}
                {Number(this.props.poolBlocksTotal) > 2999 && <Media
                    object
                    src={blocks_3000}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}
                {Number(this.props.poolBlocksTotal) > 1999 && <Media
                    object
                    src={blocks_2000}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}
                {Number(this.props.poolBlocksTotal) > 1499 && <Media
                    object
                    src={blocks_1500}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 999 && <Media
                    object
                    src={blocks_1000}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 499 && <Media
                    object
                    src={blocks_500}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 249 && <Media
                    object
                    src={blocks_250}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}


                {Number(this.props.poolBlocksTotal) > 199 && <Media
                    object
                    src={blocks_200}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}
                {Number(this.props.poolBlocksTotal) > 99 && <Media
                    object
                    src={blocks_100}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 49 && <Media
                    object
                    src={blocks_50}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 24 && <Media
                    object
                    src={blocks_25}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 9 && <Media
                    object
                    src={blocks_10}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 4 && <Media
                    object
                    src={blocks_5}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

                {Number(this.props.poolBlocksTotal) > 0 && <Media
                    object
                    src={blocks_1}
                    className="rounded mr-2 mb-2"
                    style={{ width: badgeWidth, height: 'auto' }}
                />}

            </div >
        )
    };
};

