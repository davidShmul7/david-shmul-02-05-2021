import React, { Fragment } from "react";

const DailyForecast = (props) => {
  return (
    <Fragment>
      <div className="forcastWeather">
        <p>{props.day}</p>
        <p>{props.temperature}</p>
      </div>
    </Fragment>
  );
};

export default DailyForecast;
