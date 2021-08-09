import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input, Col, Card, CardHeader } from 'reactstrap';
import Select, { components } from 'react-select';
import { Redirect } from "react-router-dom";
import ReactHtmlParser from 'react-html-parser';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { truncate } from 'lodash';

const width = window.innerWidth;

const DropdownIndicator = props => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faSearch} />
      </components.DropdownIndicator>
    )
  );
};

const mobileStyle = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    borderBottom: '1px',
    width: '70vw',
    padding: '0.3em'
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(0, 0, 0)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Times New Roman, Times, Serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
  }),
};

const standardStyle = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    borderBottom: '1px',
    width: '36vw',
    padding: '0.3em'
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(0, 0, 0)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
  }),
}



class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      options: null,
      redirect: false,
      projectName: ""
    };
  }

  componentDidMount() {
    var data = this.props.allpools;
    var options = [];
    data.forEach(item => {
      var option = {
        value: item.name, label: <div>
          {ReactHtmlParser(item.name)}</div>
      };
      options.push(option);
    });
    this.setState({ options: options });
  }

  handleChange = selectedOption => {
    this.setState({ redirect: true, projectName: selectedOption.value });
  };

  redirect = () => {
    if (this.state.redirect) {
      var poolid = "";
      this.props.allpools.forEach(item => {
        if (item.name == this.state.projectName) {
          poolid = item.pool_id;
        }
      });

      return <Redirect to={{ pathname: '/pool/' + poolid }} />
    }
  }

  render() {
    const { selectedOption } = this.state;
    return (
        <div className="serach-tab">
          {this.redirect()}
          <Select
            value={selectedOption}
            options={this.state.options}
            onChange={this.handleChange}
            styles={width <= 700 ? mobileStyle : standardStyle}
            placeholder={"Search Pools..."}
            openMenuOnClick={true}
            classNamePrefix="select"
            // styles={customStyles}
            menuColor='blue'
            components={{ DropdownIndicator }}
          />
        </div>
    );
  }
}

export default SearchInput;


const customStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Times New Roman',
    fontSize: 32,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    borderBottom: '1px',
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(0, 0, 0)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Times New Roman, Times, Serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
  }),
}
