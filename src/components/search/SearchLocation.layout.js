import React, { useRef } from "react";
import "./SearchLocation.style.css";

const SearchLocation = (props) => {
  const searchInput = useRef(null);
  return (
    <div className="searchContainer">
      <div className="searchLocation">
        <input ref={searchInput} type="text" placeholder="search"></input>
        <input
          type="button"
          onClick={() => props.clicked(searchInput)}
          value="Search"
          className="search-button"
        />
      </div>
    </div>
  );
};

export default SearchLocation;
