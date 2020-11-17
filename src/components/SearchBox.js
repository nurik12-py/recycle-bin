import React from 'react';

const SearchBox = ({ handleChange }) => {
    return (<input onChange={(e) => handleChange(e)} type="text" name="search" className="form-control" placeholder="Поиск" aria-label="Search" />);
}

export default SearchBox;