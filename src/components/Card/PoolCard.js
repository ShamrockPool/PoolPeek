import React from 'react';
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import SocialMedia from '../SocialMedia';
import ReactHtmlParser from 'react-html-parser';
import { isEmpty } from 'utils/stringutil.js';

var linkify = require('linkifyjs');
require('linkifyjs/plugins/hashtag')(linkify); // optional
var linkifyHtml = require('linkifyjs/html');

export default class PoolCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {
    }

    checkIsImageUrl(url) {
        if (url == null || isEmpty(url)) {
            return false;
        }
        if (url.startsWith("https") && (url.endsWith(".png") || url.endsWith(".jpeg"))) {
            return true;
        }
        return false;
    }

    addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }

    render() {
        return (
            <Link to={{ pathname: '/pool/' + this.props.pool.pool_id, state: { projectDetails: this.props.projectDetails } }}>
                <div className="ProjectCard" style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}>
                    <div style={{ paddingTop: 15, alignSelf: 'flex-start' }}>
                        {this.checkIsImageUrl(this.props.pool.extended_meta.url_png_logo) ? (
                            <ReactImageFallback
                                src={this.props.pool.extended_meta.url_png_logo}
                                width="70vh" height="70vh"
                                fallbackImage={CardanoImage} />
                        ) : (<img
                            src={CardanoImage}
                            className="pr-2"
                            width="70vh" height="70vh"
                        />)}
                        <div className="ProjectCard-body">
                            <h5>{ReactHtmlParser(this.props.pool.ticker)}</h5>
                            <h2>{ReactHtmlParser(this.props.pool.name)}</h2>

                            <Row style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                            }}>
                                <Col xl={4} lg={4} md={12} sm={12} >
                                    <h3>Stake</h3>
                                    <h3><b>{this.addCommas(this.props.pool.live_stake)} ₳</b></h3>
                                </Col>

                                {this.props.pool.live_stake_delegator_count &&
                                    <Col xl={4} lg={4} md={12} sm={12} >
                                        <h3>Delegates</h3>
                                        <h3><b>{this.addCommas(this.props.pool.live_stake_delegator_count)}</b></h3>
                                    </Col>}
                            </Row>

                            {this.props.pool.description &&
                                <h4>{ReactHtmlParser(linkifyHtml(this.props.pool.description, {
                                    defaultProtocol: 'https'
                                }))}</h4>}
                        </div>
                    </div>
                </div>
            </Link >
        )
    };
};

