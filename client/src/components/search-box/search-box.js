import React from 'react';
import './search-box.styles.css';



const SearchBox = ({placeholder, handleSearchChange}) => (
    <input 
    className="search"
    type='search' 
    placeholder={placeholder} 
    onChange={handleSearchChange}  
    />
)

export default SearchBox;
