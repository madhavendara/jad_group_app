import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="Footer_container">
        <a href="https://jadgroup.goaspendigital.com/">
          <img
            src="https://jadgroup.goaspendigital.com/wp-content/uploads/elementor/thumbs/logo2.0-qi1l89rjb6osx3xmma241fd0t5n88vosq8dh19fu2c.png"
            title="logo2.0"
            alt="logo2.0"
            loading="lazy"
            className="Logo_img"
          />
        </a>
        <ul>
          <li>
            <Link to="https://jadgroup.goaspendigital.com/about-us/">
              About Us
            </Link>
          </li>
          <li>
            <Link to="https://jadgroup.goaspendigital.com/about-us/">
              Service Contract login
            </Link>
          </li>
        </ul>
        <p className="Copyright">
          Copyright © 2023 JAD Group Inc. | Privacy Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
