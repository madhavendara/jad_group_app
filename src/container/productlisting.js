import React, { useState, useEffect } from "react";
import SelectedOption from "../component/selected_options";
import Search from "../component/search";
import Equipment_table from "../component/equipment_table";
import Equipment_SecondType from "../component/equipment_secondtype";
import Pagination from "../component/Pagination";
function Productlisting() {
  const [equipment_list, seteqipment_list] = useState([]);
  const [model, Setmodel] = useState(["T5376", "V93K SD"]);
  const [loading, setLoading] = useState(false);
  const [noresult, setnoresult] = useState("");
  const [search, setsearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async (page) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://jadgroup2.goaspendigital.com/api/equipmentlisting.php?page=${page}&search=${search}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(response);
      console.log(responseData);
      if (responseData.error) {
        console.error("Error fetching data:", responseData.error);
      } else {
        setLoading(false);

        if (search != "") {
          seteqipment_list(responseData["message"]);
        } else {
          seteqipment_list(responseData.message);
        }

        setnoresult("No result found");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const handlePageChange = async (newPage) => {
    setCurrentPage(newPage);

    try {
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: "smooth" });
      const response = await fetchData(newPage);
      // console.log("Page changed:", newPage);
      // Process the response if needed
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, search]);
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

  const searchfunction = (query) => {
    // console.log(query);
    setsearch(query);
    setCurrentPage(1);
  };

  const getInitialVisual = () => {
    return window.innerWidth < 900 ? "first" : "second";
  };

  const [activeVisual, setActiveVisual] = useState(getInitialVisual());

  useEffect(() => {
    fetchData(currentPage);
    // Add an event listener to update the state when the window is resized
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [currentPage, search]);

  const handleWindowResize = () => {
    setActiveVisual(getInitialVisual());
  };
  const handleVisualClick = (visual) => {
    setActiveVisual(visual);
  };
  const tableHeaders =
    activeVisual === "second" ? (
      <div className="table-header">
        <div className="equipment table-head">
          <h5>Equipment</h5>
        </div>
        <div className="table-head-2 table-head">
          <h5>Model</h5>
        </div>
        <div className="table-head-2 table-head">
          <h5>Vintage</h5>
        </div>
        <div className="table-head-2 table-head">
          <h5>Inspection Available</h5>
        </div>
        <div className="table-head-2 table-head">
          <h5>Condition</h5>
        </div>
        <div className="table-head-3 table-head">
          <h5>Manufacturer</h5>
        </div>
        <div className="table-head-3 table-head">
          <h5>Actions</h5>
        </div>
      </div>
    ) : (
      <div className="table-header"></div>
    );
  const defaultImageOne =
    "https://jadgroup.goaspendigital.com/wp-content/uploads/2024/01/Grou-768x433.png";
  const defaultImageTwo =
    "https://jadgroup.goaspendigital.com/wp-content/uploads/2024/01/Group-1000001810-768x422.png";

  const equipment_data_html =
    equipment_list &&
    Array.isArray(equipment_list) &&
    equipment_list.length > 0 ? (
      equipment_list.map((value, index) => (
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
            thumb={value.Picture ? value.Picture  : defaultImageOne}
          />
        </div>
      ))
    ) : (
      <div className="no-result">{noresult}</div>
    );

  const equipment_data_html_two =
    equipment_list &&
    Array.isArray(equipment_list) &&
    equipment_list.length > 0 ? (
      equipment_list.map((value, index) => (
        <div key={index}>
          <Equipment_SecondType
            data={value}
            jad_id={value["JAD_ID"]}
            description={value.Description}
            model={value.Model}
            vintage={value.Vintage}
            Inspection_Available={value.Is_Inspection_Available}
            Condition={value.Condition}
            Manufacturer={value.Manfacturer_Id}
            thumb={value.Picture ? value.Picture  : defaultImageOne}
          />
        </div>
      ))
    ) : (
      <div className="no-result">{noresult}</div>
    );

  const equipmentData =
    activeVisual === "second" ? equipment_data_html : equipment_data_html_two;

  return (
    <>
      <div className="banner-image">
        <h1>Equipment Available for Sale</h1>
      </div>
      <div className="filter-header-container">
        <div className="filter-container">
          <SelectedOption
            name="Manufacturer"
            values={menufecture}
            searchfunction={(query) => searchfunction(query)}
            searchvalue={search}
          />
          <SelectedOption
            name="Model"
            values={model}
            searchfunction={(query) => searchfunction(query)}
            searchvalue={search}
          />

          <button
            className={`Desctop visual-option ${
              activeVisual === "second" ? "active-visual" : ""
            }`}
            onClick={() => handleVisualClick("second")}
          >
            {activeVisual === "second" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="34"
                viewBox="0 0 33 34"
                fill="none"
              >
                <g clip-path="url(#clip0_993_5178)">
                  <line
                    x1="0.00146484"
                    y1="12.1526"
                    x2="31.6722"
                    y2="12.1526"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                  <line
                    x1="10.3418"
                    y1="33.4817"
                    x2="10.3418"
                    y2="1.81094"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                  <line
                    x1="0.00146484"
                    y1="1.81102"
                    x2="31.6722"
                    y2="1.81102"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                  <line
                    x1="0.00146484"
                    y1="22.494"
                    x2="31.6722"
                    y2="22.494"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                  <line
                    x1="-1.29199"
                    y1="32.8354"
                    x2="30.3787"
                    y2="32.8354"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                </g>
                <rect
                  x="1.29268"
                  y="1.81099"
                  width="30.3781"
                  height="30.3781"
                  rx="5.17072"
                  stroke="#017CC2"
                  stroke-width="2.58536"
                />
                <defs>
                  <clipPath id="clip0_993_5178">
                    <rect
                      y="0.518311"
                      width="32.9634"
                      height="32.9634"
                      rx="6.46341"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="34"
                viewBox="0 0 33 34"
                fill="none"
              >
                <g opacity="0.32">
                  <g clip-path="url(#clip0_993_7585)">
                    <line
                      x1="0.00146484"
                      y1="12.1526"
                      x2="31.6722"
                      y2="12.1526"
                      stroke="#333333"
                      stroke-width="2.58536"
                    />
                    <line
                      x1="10.3418"
                      y1="33.4817"
                      x2="10.3418"
                      y2="1.81094"
                      stroke="#333333"
                      stroke-width="2.58536"
                    />
                    <line
                      x1="0.00146484"
                      y1="1.81108"
                      x2="31.6722"
                      y2="1.81108"
                      stroke="#333333"
                      stroke-width="2.58536"
                    />
                    <line
                      x1="0.00146484"
                      y1="22.4939"
                      x2="31.6722"
                      y2="22.4939"
                      stroke="#333333"
                      stroke-width="2.58536"
                    />
                    <line
                      x1="-1.29199"
                      y1="32.8355"
                      x2="30.3787"
                      y2="32.8355"
                      stroke="#333333"
                      stroke-width="2.58536"
                    />
                  </g>
                  <rect
                    x="1.29268"
                    y="1.81099"
                    width="30.3781"
                    height="30.3781"
                    rx="5.17072"
                    stroke="#333333"
                    stroke-width="2.58536"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_993_7585">
                    <rect
                      y="0.518311"
                      width="32.9634"
                      height="32.9634"
                      rx="6.46341"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>

          <button
            className={`Desctop visual-option ${
              activeVisual === "first" ? "active-visual" : ""
            }`}
            onClick={() => handleVisualClick("first")}
          >
            {activeVisual === "first" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
              >
                <g clip-path="url(#clip0_993_7591)">
                  <rect
                    x="3.54907"
                    y="2.45752"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                  <rect
                    x="20.3545"
                    y="2.45752"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                  <rect
                    x="3.54907"
                    y="19.9084"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                  <rect
                    x="20.3545"
                    y="19.9084"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#017CC2"
                    stroke-width="2.58536"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_993_7591">
                    <rect
                      width="32.9634"
                      height="32.9634"
                      fill="white"
                      transform="translate(0.963379 0.518311)"
                    />
                  </clipPath>
                </defs>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
              >
                <g clip-path="url(#clip0_993_5184)">
                  <rect
                    x="3.54907"
                    y="2.4574"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#A7A7A7"
                    stroke-width="2.58536"
                  />
                  <rect
                    x="20.3545"
                    y="2.4574"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#A7A7A7"
                    stroke-width="2.58536"
                  />
                  <rect
                    x="3.54907"
                    y="19.9086"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#A7A7A7"
                    stroke-width="2.58536"
                  />
                  <rect
                    x="20.3545"
                    y="19.9086"
                    width="11.6341"
                    height="11.6342"
                    rx="1.93902"
                    stroke="#A7A7A7"
                    stroke-width="2.58536"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_993_5184">
                    <rect
                      width="32.9634"
                      height="32.9634"
                      fill="white"
                      transform="translate(0.963379 0.518311)"
                    />
                  </clipPath>
                </defs>
              </svg>
            )}
          </button>

          <button
            onClick={() => searchfunction("")}
            className={search == "" ? "clear-all-btn d-none" : "clear-all-btn"}
          >
            Clear All filter
          </button>
          <Search
            value={Search}
            searchfunction={(query) => searchfunction(query)}
          />
        </div>
      </div>
      {loading && <div className="loading-bar">Loading...</div>}
      <div className="Display_box">
        {tableHeaders}
        {equipmentData}
      </div>
      <Pagination onPageChange={handlePageChange} currentPage={currentPage} />
    </>
  );
}

export default Productlisting;
