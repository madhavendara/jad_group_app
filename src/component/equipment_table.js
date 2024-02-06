import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "./equipmentform";

function Equipment_table(props) {

  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate("/productDetails", { state: { equipmentData: props } });
  };

  
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const handleInquireButtonClick = () => {
    setShowInquiryModal(true);
  };

  const handleCloseInquiryModal = () => {
    setShowInquiryModal(false);
  };

  return (
    <>
      <div className="equipment_table_card">
        <div className="equipment table-head">
          <img src={props.thumb} className="thumbnail" />
          <div className="equipment-details">
            <h5>
              JAD-ID: <strong>{props.jad_id}</strong>
            </h5>
            <p>{props.description}</p>
            <button className="view-details">Detailed Specifications</button>
          </div>
        </div>
        <div className="table-head-2 table-head">
          <h4>{props.model}</h4>
        </div>
        <div className="table-head-2 table-head">
          <h4>{props.vintage}</h4>
        </div>
        <div className="table-head-2 table-head">
          <h4>{props.Inspection_Available == 0 ? 'No' : 'Yes'}</h4>
        </div>
        <div className="table-head-2 table-head">
          <h4>{props.Condition}</h4>
        </div>
        <div className="table-head-3 table-head">
          <h4>{props.Manufacturer}</h4>
        </div>
        <div className="table-head-3 table-head">
          <button className="more-details-btn" onClick={handleDetailsClick}>
            MORE DETAILS
          </button>

          <button className="inquire-btn" onClick={handleInquireButtonClick}>
            INQUIRE
          </button>
        </div>
      </div>

      <EquipmentForm showInquiryModal={showInquiryModal} handleCloseInquiryModal={handleCloseInquiryModal} values={props} />

    </>
  );
}

export default Equipment_table;
