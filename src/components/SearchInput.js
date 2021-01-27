import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

const SearchInput = () => {
  return (
    <Form inline className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
      />
      <Input
        type="text"
        className="cr-search-form__input"
        placeholder="Search..."
        onChange={this.props.onChangeValue}
      />
    </Form>
  );
};

export default SearchInput;
