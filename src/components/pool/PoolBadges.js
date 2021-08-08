import React, { useState } from 'react';
import { Media } from 'reactstrap';
import blocks_1 from 'assets/img/poolbadges/1st.png';
import blocks_5 from 'assets/img/poolbadges/5th.png';
import blocks_10 from 'assets/img/poolbadges/10th.png';
import blocks_25 from 'assets/img/poolbadges/25th.png';
import blocks_50 from 'assets/img/poolbadges/50th.png';
import blocks_100 from 'assets/img/poolbadges/100th.png';
import blocks_200 from 'assets/img/poolbadges/200th.png';
import blocks_250 from 'assets/img/poolbadges/250th.png';
import blocks_500 from 'assets/img/poolbadges/500th.png';
import blocks_1000 from 'assets/img/poolbadges/1000th.png';
import blocks_1500 from 'assets/img/poolbadges/1500th.png';
import blocks_2000 from 'assets/img/poolbadges/2000th.png';
import blocks_3000 from 'assets/img/poolbadges/3000th.png';
import blocks_4000 from 'assets/img/poolbadges/4000th.png';
import blocks_5000 from 'assets/img/poolbadges/5000th.png';
import { Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import ModalImage from "react-modal-image";

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

const width = window.innerWidth;


const badgeWidth = 300;
const padding = "10px";
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
            <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
            }}>
                <Row style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    {Number(this.props.poolBlocksTotal) > 4999 &&
                        <ModalImage
                            small={blocks_5000}
                            large={blocks_5000}
                            style={{ width: badgeWidth, height: 'auto' }}
                        />
                    }

                    {Number(this.props.poolBlocksTotal) > 3999 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_4000}
                                large={blocks_4000}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 2999 &&
                        <div style={{ width: badgeWidth, height: 'auto' }}>
                            <ModalImage
                                small={blocks_3000}
                                large={blocks_3000}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 1999 &&
                        <div style={{ width: badgeWidth, height: 'auto' }}>
                            <ModalImage
                                small={blocks_2000}
                                large={blocks_2000}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 1499 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_1500}
                                large={blocks_1500}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 999 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_1000}
                                large={blocks_1000}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 499 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_500}
                                large={blocks_500}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 249 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_250}
                                large={blocks_250}
                            />
                        </div>
                    }


                    {Number(this.props.poolBlocksTotal) > 199 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_200}
                                large={blocks_200}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 99 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_100}
                                large={blocks_100}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 49 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_50}
                                large={blocks_50}
                            />
                        </div>}

                    {Number(this.props.poolBlocksTotal) > 24 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_25}
                                large={blocks_25}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 9 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_10}
                                large={blocks_10}
                            />
                        </div>}

                    {Number(this.props.poolBlocksTotal) > 4 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_5}
                                large={blocks_5}
                            />
                        </div>
                    }

                    {Number(this.props.poolBlocksTotal) > 0 &&
                        <div style={{ width: badgeWidth, height: 'auto', padding: padding }}>
                            <ModalImage
                                small={blocks_1}
                                large={blocks_1}
                            />
                        </div>
                    }
                </Row>
            </div >
        )
    };
};

