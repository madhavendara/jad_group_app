import React from "react";
import Navigation from "../component/Navigation";

const Header = () => {
  return (
    <header>
      <div className="Header">
        <a href="https://jadgroup.goaspendigital.com/">
          <img
            src="https://jadgroup.goaspendigital.com/wp-content/uploads/elementor/thumbs/logo2.0-qi1l89rjb6osx3xmma241fd0t5n88vosq8dh19fu2c.png"
            title="logo2.0"
            alt="logo2.0"
            loading="lazy"
            className="Logo_img"
          />
        </a>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
