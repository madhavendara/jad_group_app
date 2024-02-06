import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EquipmentForm from "../component/equipmentform";
import Equipment_table from "../component/equipment_table";


const ProductDetail = () => {
  const { state } = useLocation();
  const product = state ? state.equipmentData.data : null;
  const [relatedProducts, setRelatedProducts] = useState([]);


  const fetchData = async (page) => {

    try {
      const response = await fetch(`https://jadgroup2.goaspendigital.com/api/equipmentlisting.php?page=1&search=`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
     
      const responseData = await response.json();
      console.log(response)
      console.log(responseData)
      if (responseData.error) {
        console.error('Error fetching data:', responseData.error);
      } else {
       
        setRelatedProducts(responseData.message);

        
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };


  useEffect(() => {
    fetchData(1);
  }, []);


  console.log(product);
  const defaultImage =
    "https://jadgroup.goaspendigital.com/wp-content/uploads/2024/01/Group-1000001810-768x422.png";

  // Check if 'images' is present and not null
  const images = product && product.Picture ? product.images : [];
  const hasImages = images > 0;

  const [selectedImage, setSelectedImage] = useState(
    hasImages ? images[0].large : defaultImage
  );
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  
  const values = {
    'jad_id' : product.JAD_ID,
    'description' : product.Description,
    'model' : product.Model,
    'vintage' : product.Vintage,
    'Inspection_Available' : product.Inspection_Available,
    'Condition' : product.Condition,
    'Manufacturer' : product.Manfacturer_Id,
    'thumb' : defaultImage
  }

  const handleThumbnailClick = (largeImage, index) => {
    setSelectedImage(largeImage);
    setSelectedThumbnail(index);
  };
  const handleRightButtonClick = () => {
    if (startIndex < product.images - 4) {
      setStartIndex(startIndex + 1);
    }
  };

  const handleLeftButtonClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };
  const handleLargeImageChange = (direction) => {
    const newIndex =
      direction === "next" ? selectedThumbnail + 1 : selectedThumbnail - 1;

    if (newIndex >= 0 && newIndex < product.images) {
      setSelectedImage(product.images[newIndex].large);
      setSelectedThumbnail(newIndex);
    }
  };
  const handleInquireButtonClick = () => {
    setShowInquiryModal(true);
  };

  const handleCloseInquiryModal = () => {
    setShowInquiryModal(false);
  };


  const related_product_data_html = (relatedProducts && Array.isArray(relatedProducts) && relatedProducts.length > 0) ? relatedProducts.slice(0, 2).map((value, index) => (
    <div className="Not_flex" key={index}>
      <Equipment_table
        data={value}
        jad_id={value["JAD_ID"]}
        description={value.Description}
        model={value.Model}
        vintage={value.Vintage}
        Inspection_Available={value.Is_Inspection_Available}
        Condition={value.Condition}
        Manufacturer={value.Manfacturer_Id}
        thumb={value.images?.[0]?.large || defaultImage}
      />
    </div>
  )) : <div className="no-result"></div>;


  return (
    <>
      <div className="banner-image">
        <h1>Equipment Available for Sale</h1>
      </div>
      <div className="Product_details_container">
        <div className="Display_box_product">
          <div className="Product_img_Box">
            <div className="large_img">
              <img src={selectedImage} alt="" />
              <button
                onClick={() => handleLargeImageChange("prev")}
                className="ButtOn large-image-button"
              >
                <img
                  src="https://jadgroup.goaspendigital.com/app_files/left.png"
                  className="left_btn"
                />
              </button>
              <button
                onClick={() => handleLargeImageChange("next")}
                className="ButtOn large-image-button"
              >
                <img
                  src="https://jadgroup.goaspendigital.com/app_files/right.png"
                  className="Right_btn"
                />
              </button>
            </div>
            <div className="small_images">
              {hasImages &&
                images
                  .slice(startIndex, startIndex + 4)
                  .map((image, index) => (
                    <img
                      key={index}
                      src={image.large || defaultImage}
                      alt={`Thumbnail ${startIndex + index + 1}`}
                      onClick={() =>
                        handleThumbnailClick(
                          image.large || defaultImage,
                          startIndex + index
                        )
                      }
                      className={
                        selectedThumbnail === startIndex + index
                          ? "selected-thumbnail"
                          : ""
                      }
                    />
                  ))}
              {hasImages && (
                <>
                  <button
                    onClick={handleLeftButtonClick}
                    disabled={startIndex === 0}
                    className="ButtOn"
                  >
                    <img
                      src="https://jadgroup.goaspendigital.com/app_files/left.png"
                      className="left_btn"
                    />
                  </button>
                  <button
                    onClick={handleRightButtonClick}
                    disabled={startIndex === images.length - 4}
                    className="ButtOn"
                  >
                    <img
                      src="https://jadgroup.goaspendigital.com/app_files/right.png"
                      className="Right_btn"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="product_details_text">
            <h3>View Equipment</h3>
            <h4>
              <span>Model:</span>
              {product.Model}
            </h4>
            <h4>
              <span>Vintage:</span>
              {product.Vintage}
            </h4>
            <h4>
              <span>Inspection Available:</span>
              {product.Is_Inspection_Available}
            </h4>
            <h4>
              <span>Condition:</span>
              {product.Condition}
            </h4>
            <h4>
              <span>Manufacturer:</span>
              {product.Manfacturer_Id}
            </h4>
            <p className="Ns">Seiko Epson NS7000</p>
            <a href="#" className="Detailed">
              Detailed Specifications: <span>{product.detailedPdfLink}</span>
            </a>

            <p>{product.Description}</p>    

            <button className="inquire-btn" onClick={handleInquireButtonClick}>
              INQUIRE
              <img src="https://jadgroup.goaspendigital.com/app_files/Subtractttt.svg" />
            </button>
            
            <EquipmentForm showInquiryModal={showInquiryModal} handleCloseInquiryModal={handleCloseInquiryModal} values={values} />

          </div>
        </div>
        <div className="Manufacturer_box">
          <h1>More from the Manufacturer</h1>
                {related_product_data_html}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
