import React from "react";
import "./Favorites.style.css";
import Favorite from "../Favorites/Favorite/Favorite.layout";
import { useSelector } from "react-redux";

const Favorites = (props) => {
  const locationsList = useSelector((state) => state.inFavorites);

  return (
    <div className="mainFavoritesContainer">
      {locationsList &&
        locationsList.map((location) => {
          return (
            <Favorite
              id={location.id}
              city={location.city}
              temperature={location.temperature}
              weather={location.weather}
              clicked={() => props.clicked(location.id)}
            />
          );
        })}
    </div>
  );
};

export default Favorites;
