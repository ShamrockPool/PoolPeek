import React from 'react';
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';

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

    render() {
        return (
            <Link to={{ pathname: '/pool/' + this.props.pool.pool_id, state: { projectDetails: this.props.projectDetails } }}>
                <div className="ProjectCard">
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
                            <h2>{ReactHtmlParser(this.props.pool.name)}</h2>
                            <h5>{ReactHtmlParser(this.props.pool.ticker)}</h5>
                            <h4>{ReactHtmlParser(linkifyHtml(this.props.pool.description, {
                                defaultProtocol: 'https'
                            }))}</h4>
                        </div>
                    </div>
                </div>
            </Link >
        )
    };
};

