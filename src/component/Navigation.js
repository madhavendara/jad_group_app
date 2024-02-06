import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav>
      {/* Desktop Navigation */}
      <ul className="First_unorderlist">
        <li>
          <Link to="https://jadgroup.goaspendigital.com/equipment/">
            EQUIPMENT
          </Link>
        </li>
        <li>
          <Link to="https://jadgroup.goaspendigital.com/inventory-listing/">Parts</Link>
        </li>
        <li
          onMouseEnter={handleDropdownToggle}
          onMouseLeave={handleDropdownToggle}
        >
          <a href="#">Repairs</a>
          {isDropdownOpen && (
            <ul className="Dropdown">
              <li>
                <Link to="https://jadgroup.goaspendigital.com/advantest-legacy-board-repair/">
                  Advantest Legacy Board Repair Service
                </Link>
              </li>
              <li>
                <Link to="https://jadgroup.goaspendigital.com/advantest-instrument-repair-service/">
                  Advantest Instrument Repair Service
                </Link>
              </li>
              <li>
                <Link to="https://jadgroup.goaspendigital.com/teradyne/">
                  Teradyne Catalyst Board Repair Service
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="https://jadgroup.goaspendigital.com/about-us/">
            About Us
          </Link>
        </li>
        <li>
          <Link to="#">Service Contract login</Link>
        </li>
      </ul>

      {/* Mobile Navigation */}
      <div className="MobileNav">
        <button onClick={handleMobileMenuToggle} className="menu-button">
            <svg aria-hidden="true" class="e-font-icon-svg e-fas-bars" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
        </button>
        {isMobileMenuOpen && (
          <ul className="MobileMenu">
            <li>
              <Link to="https://jadgroup.goaspendigital.com/equipment/">
                EQUIPMENT
              </Link>
            </li>
            <li>
              <Link to="https://jadgroup.goaspendigital.com/inventory-listing/">
                Parts
              </Link>
            </li>
            <li
              onMouseEnter={handleDropdownToggle}
              onMouseLeave={handleDropdownToggle}
            >
              <a href="#">Repairs</a>
              {isDropdownOpen && (
                <ul className="Dropdown">
                  <li>
                    <Link to="https://jadgroup.goaspendigital.com/advantest-legacy-board-repair/">
                      Advantest Legacy Board Repair Service
                    </Link>
                  </li>
                  <li>
                    <Link to="https://jadgroup.goaspendigital.com/advantest-instrument-repair-service/">
                      Advantest Instrument Repair Service
                    </Link>
                  </li>
                  <li>
                    <Link to="https://jadgroup.goaspendigital.com/teradyne/">
                      Teradyne Catalyst Board Repair Service
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="https://jadgroup.goaspendigital.com/about-us/">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#">Service Contract login</Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
