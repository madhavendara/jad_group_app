import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EquipmentForm from "./equipmentform";

function Equipment_SecondType(props) {
  const navigate = useNavigate();
  const handleDetailsClick = () => {
    navigate("/productDetails", { state: { equipmentData: props } });
  };

  const [showInquiryModal, setShowInquiryModal] = useState(false);

  const handleInquireButtonClick = () => {
    setShowInquiryModal(true)
  }

  const handleCloseInquiryModal = () => {
    setShowInquiryModal(false);
  };

  return (
    <>
      <div className="equipment_table_card2">
        <div className="equipment table-head2">
          <img src={props.thumb} className="thumbnail" />
          <div className="equipment-details2">
            <h5>
              JAD-ID: <strong>{props.jad_id}</strong>
            </h5>
            <p>{props.description}</p>
          </div>
        </div>
        <div className="table-head-2_two table-head">
          <h4>
            <span>Model:</span>
            {props.model}
          </h4>
        </div>
        <div className="table-head-2_two table-head">
          <h4>
            <span>Vintage:</span>
            {props.vintage}
          </h4>
        </div>
        <div className="table-head-2_two table-head">
          <h4>
            <span>Inspection Available:</span>
            {props.Inspection_Available == 0 ? 'No' : 'Yes'}
          </h4>
        </div>
        <div className="table-head-2_two table-head">
          <h4>
            <span>Condition:</span>
            {props.Condition}
          </h4>
        </div>
        <div className="table-head-3_two table-head">
          <h4>
            <span>Manufacturer:</span>
            {props.Manufacturer}
          </h4>
        </div>
        <button className="view-details">Detailed Specifications</button>
        <div className="table-head-3_two table-head Display_buttons">
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

export default Equipment_SecondType;
