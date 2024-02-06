import React, { useState, useEffect } from "react";
import SelectedOption from "../component/selected_options";
import Search from "../component/search";
import PartsInventory from "../component/Parts-Inventory";
import Pagination from "../component/Pagination";

function Inventorylist() {
  const [menufecture, Setmenufecture] = useState([
    "3M",
    "Accretech",
    "Advantest",
    "Agilent",
    "Ando",
    "Applied Materials",
    "ASA",
    "Camtek",
  ]);

  const [model, Setmodel] = useState(["Chinese", "Korean", "Japanese"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setsearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [noresult, setnoresult] = useState('');

  const fetchData = async (page) => {

    setLoading(true); 

    try {
      const response = await fetch(`https://jadgroup2.goaspendigital.com/api/equipmentlisting.php?page=${page}&search=${search}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      if (responseData.error) {
        console.error('Error fetching data:', responseData.error);
        console.log(response)
      } else {
        setLoading(false); 
        if(search != '') {
          seteqipment_list(responseData['message']);
        }
        else {
          seteqipment_list(responseData.message);
        }
        
        setnoresult('No result found');
        console.log(responseData)
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  const [equipment_list, seteqipment_list] = useState([
  
  ]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, search]);

  const searchfunction = (query) => {
    console.log(query);
    setsearch(query);
    setCurrentPage(1);
  };


  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);

    try {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
      const response = await fetchData(newPage);
      console.log("Page changed:", newPage);
      // Process the response if needed
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } 
  };

  const defaultImageOne =
  "https://jadgroup.goaspendigital.com/wp-content/uploads/2024/01/Grou-768x433.png";
const defaultImageTwo =
  "https://jadgroup.goaspendigital.com/wp-content/uploads/2024/01/Group-1000001810-768x422.png";




  const equipment_data_html = (equipment_list && (
    (Array.isArray(equipment_list) && equipment_list.length > 0))) ? equipment_list.map((value, index) =>  {
    return (
      <PartsInventory
        jad_id={value.JAD_ID}
        description={value.Description}
        model={value.Model}
        Manufacturer={value.Manfacturer_Id}
        data={value}
        thumb={defaultImageOne}
        Inspection_Available={value.Is_Inspection_Available}
        vintage={value.Vintage}
        Condition={value.Condition}

      />
    );
  }) : <div className="no-result">{noresult}</div>;

  return (
    <>
      <div className="banner-image">
        <h1>Parts Inventory</h1>
      </div>
      <div className="filter-header-container">
        <div className="filter-container">
        <SelectedOption name="Manufacturer" values={menufecture} searchfunction={(query) => searchfunction(query)} searchvalue={search} />

          <button onClick={() => searchfunction('')} className={search == '' ? "clear-all-btn d-none" : "clear-all-btn"}>
           Clear All filter
          </button>
          
          <Search
            value={Search}
            searchfunction={(query) => searchfunction(query)}
          />
        </div>
      </div>

      <div className="table-header ">
        <div className="table-head-2 table-head Revision">
          <h5>Parts</h5>
        </div>
        <div className="table-head-2 table-head description">
          <h5>Description</h5>
        </div>
        <div className="table-head-2 table-head Part_Number">
          <h5>Manufacturer</h5>
        </div>
        <div className="table-head-2 table-head Part_Number">
          <h5>Part Number</h5>
        </div>
        <div className="table-head-3 table-head Revision">
          <h5>Revision</h5>
        </div>

        <div className="table-head-3 table-head Action">
          <h5>Actions</h5>
        </div>
      </div>

      {equipment_data_html}
      {loading && <div className="loading-bar">Loading...</div>}
      <Pagination onPageChange={handlePageChange} currentPage={currentPage} />
    </>
  );
}

export default Inventorylist;
