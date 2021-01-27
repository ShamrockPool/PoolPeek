import React from 'react';
import { Form, Input } from 'reactstrap';

export default class SearchBar extends React.Component {

    state = { text: "" }

    handleChange = (e) => {
        this.setState({ text: e.target.value })
        e.preventDefault();
        this.props.getSearchText(this.state.text)
    }

    render() {
        return (
            <div>
                <Form inline className="cr-search-form">
                    <Input
                        type="text"
                        className="cr-search-form__input"
                        placeholder="Search..."
                        onChange={this.handleChange}
                        value = {this.state.text}
                    />
                </Form>
            </div>
        )
    }

}