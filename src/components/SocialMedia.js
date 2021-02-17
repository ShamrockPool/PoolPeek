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
        if (this.props.extendemetadataurl != undefined && this.props.extendemetadataurl != "") {
            await this.fetchExtendedMetaData(this.props.extendemetadataurl);
        }
    }

    async fetchExtendedMetaData(query) {
        console.log("fetch:" + query)


        fetch(query)
            .then(response => response.json())
            .then((jsonData) => {
                // jsonData is parsed json object received from url
                console.log(jsonData)
                this.state.twitterHandle = jsonData.info.social.twitter_handle;
                this.state.telegramHandle = jsonData.info.social.telegram_handle;
            })
            .catch((error) => {
                // handle your errors here
                console.error(error)
            })
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

