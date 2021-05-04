import React, { useState } from "react";
import "./App.css";
import MainHeader from "../components/MainHeader/MainHeader.layout";
import WeatherDetails from "../components/Weather/WeatherDetails.layout";
import Favorites from "../components/Favorites/Favorites.layout";
import { useSelector } from "react-redux";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedLocation, setSelectedLocation] = useState();
  const locationsInFavorites = useSelector((state) => state.inFavorites);

  const handleNavigation = (navState) => {
    setCurrentPage(navState);
  };

  const handleOnClick = (id) => {
    setCurrentPage("home");
    const locationsArr = [...locationsInFavorites];
    const selectedLocation = locationsArr.filter((loc) => loc.id === id);
    setSelectedLocation(selectedLocation[0]);
  };

  return (
    <div className="App">
      <MainHeader clicked={handleNavigation} currentPage={currentPage} />
      {currentPage === "home" ? (
        <WeatherDetails location={selectedLocation} />
      ) : (
        <Favorites clicked={handleOnClick} />
      )}
    </div>
  );
}

export default App;
