import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faTelegram } from "@fortawesome/free-brands-svg-icons";


export default class SocialMedia extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            twitterHandle: "",
            telegramHandle: ""
        }
    }

    async componentDidMount() {
        if (this.props.extendedmeta != undefined && this.props.extendedmeta != "") {

            if (this.props.extendedmeta.twitter_handle != "") {
                this.state.twitterHandle = this.props.extendedmeta.twitter_handle;
                this.setState({ twitterHandle: this.props.extendedmeta.twitter_handle });
            }

            if (this.props.extendedmeta.twitter_handle != "") {
                this.state.telegramHandle = this.props.extendedmeta.telegram_handle;
                this.setState({ telegramHandle: this.props.extendedmeta.telegram_handle });
            }
        }
    }




    render() {
        return (
            <div>
                {this.state.twitterHandle != "" &&
                    <a href={"https://twitter.com/@" + this.state.twitterHandle} target="_blank" rel="noreferrer">
                        <img
                            className="pr-2"
                            alt=""
                        /> <FontAwesomeIcon icon={faTwitter} /></a>}

                {this.state.telegramHandle != "" &&
                    <a href={"https://t.me/" + this.state.telegramHandle} target="_blank" rel="noreferrer">
                        <img
                            className="pr-2"
                            alt=""
                        /> <FontAwesomeIcon icon={faTelegram} /></a>}
            </div>
        )
    };
};

