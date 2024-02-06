import React, { useState, useEffect } from 'react';

function Search(props) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      props.searchfunction(inputValue.trim());
    }
  };

  const handlebuttonpress = (e) => {
    props.searchfunction(inputValue.trim());
  }

  return (
    <>
      <div className='search-container'>
        <input
          type='text'
          className='search-input'
          placeholder='Search Part Number, JAD-ID, Model, & Keyword'
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        <button className='search-btn' onClick={handlebuttonpress}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M9.04289 15.3333C12.7248 15.3333 15.7096 12.3486 15.7096 8.66667C15.7096 4.98477 12.7248 2 9.04289 2C5.36099 2 2.37622 4.98477 2.37622 8.66667C2.37622 12.3486 5.36099 15.3333 9.04289 15.3333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.3762 17L13.7512 13.375" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </>
  );
}

export default Search;