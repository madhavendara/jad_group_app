import React from 'react';

function Popup(props) {



  return (
    <>
      <div className='popup-box' style={{ display: !props.poup_close ? 'none' : 'flex' }}>
            <h3>Form submitted!</h3>
            <p>Thank you for your information! we will contact you asap.</p>
            <button className="inquire-btn" onClick={props.close_popup}>Close</button>
      </div>
    </>
  );
}

export default Popup;