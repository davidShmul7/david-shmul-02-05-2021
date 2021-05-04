import React, { Fragment } from "react";

const Favorite = (props) => {
  return (
    <Fragment>
      <div
        id={props.id}
        name=""
        className="favoritesWeather"
        onClick={props.clicked}
      >
        <div>
          <p>{props.city}</p>
          <p>{props.temperature}</p>
          <p>{props.weather}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Favorite;
