import React, { useState, useEffect } from "react";
import "./MainHeader.style.css";

const MainHeader = (props) => {
  const [activeBtn, setActiveBtn] = useState("home");

  useEffect(() => {
    setActiveBtn(props.currentPage);
  }, [props.currentPage]);

  const handleNavigation = (selectedPage) => {
    setActiveBtn(selectedPage);
    props.clicked(selectedPage);
  };

  return (
    <header className="site-header">
      <div className="wrapper site-header__wrapper">
        <h3 className="title">What's the Weather ?</h3>
        <nav className="navHome">
          <a
            className={activeBtn === "home" ? "home" : ""}
            onClick={() => handleNavigation("home")}
            href="#"
          >
            Home
          </a>
          <a
            className={activeBtn === "favorites" ? "favorites" : ""}
            onClick={() => handleNavigation("favorites")}
            href="#"
          >
            Favorites
          </a>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
