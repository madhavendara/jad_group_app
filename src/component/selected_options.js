import React, { useState, useEffect } from 'react';

function SelectedOption(props) {
  const [active, setactive] = useState(false);

  useEffect(() => {
 
    setactive(props.values.includes(props.searchvalue));
  }, [props.searchvalue, props.values]);

  const handleOptionClick = (value) => {
    // setactive(true);
    props.searchfunction(value);
  };

  let options = props.values.map((value, index) => {
    return (
      <div key={index} value={value} className={`option-value ${value === props.searchvalue ? 'active' : ''}`} onClick={() => handleOptionClick(value)}>
       <input type='checkbox' className='input-check' checked={value === props.searchvalue} />
        <h4>{value}</h4>
      </div>
    );
  });

  return (
    <>
      <div className='option-container'>
        <div className={active ? 'accordion-header active-header' : 'accordion-header'} onClick={() => setactive(!active)}>
          <h4>{props.name}</h4>
          <svg width="24" height="24" className={active ? 'arrow-active' : 'arrow-icon'} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 8L12 15L5 8" stroke={active ? "#fff" : "#DD1010"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={active ? 'option-values active-option' : "option-values"}>
          {options}
        </div>
      </div>
    </>
  );
}

export default SelectedOption;
