import React, { Fragment, useEffect } from "react";
import "./WeatherDetails.style.css";
import SearchLocation from "../search/SearchLocation.layout";
import { useState } from "react";
import { getLocationByAutoComplete } from "../../api/getLocationByAutoComplete.api";
import { getCurrentConditions } from "../../api/getCurrentConditions.api";
import { getDailyForecasts } from "../../api/getDailyForecasts";
import DailyForecast from "../DailyForecast/DailyForecast.layout";
import { getDayName } from "../../utils/getDayName";
import { convertFerToCel } from "../../utils/convertFerToCel";
import { useSelector, useDispatch } from "react-redux";
import { updateFavorites } from "../../redux/actions/index";

const WeatherDetails = (props) => {
  const [cityVal, setCityVal] = useState("");
  const [temperatureVal, setTemperatureVal] = useState("");
  const [weatherVal, setWeatherVal] = useState("");
  const [locationKey, setLocationKey] = useState("");
  const [dailyForecastList, setDailyForecastList] = useState();
  const [favoritesBtnText, setfavoritesBtnText] = useState("Add To Favorites");
  const [isLocationInFavorites, setIsLocationInFavorites] = useState();
  const locationsInFavorites = useSelector((state) => state.inFavorites);

  const dispatch = useDispatch();

  useEffect(() => {
    const searchInput = {
      current: {
        value: "Tel Aviv",
      },
    };

    if (props.location) {
      setLocationKey(props.location.id);
      setCityVal(props.location.city);
      setTemperatureVal(props.location.temperature);
      setWeatherVal(props.location.WeatherText);
      searchInput.current.value = props.location.city;
    }
    handleSearch(searchInput);
  }, []);

  useEffect(() => {
    let _isLocationInFavorites = locationsInFavorites
      ? locationsInFavorites.some((loc) => loc.id === locationKey)
      : false;
    _isLocationInFavorites
      ? setfavoritesBtnText("Remove from Favorites")
      : setfavoritesBtnText("Add To Favorites");
    setIsLocationInFavorites(_isLocationInFavorites);
  });

  const handleSearch = (searchInput) => {
    const searchText = searchInput.current.value;
    getLocationByAutoComplete({ searchText })
      .then((locationDetails) => {
        const { city, locationKey } = locationDetails;
        setCityVal(city);
        setLocationKey(locationKey);
        return locationKey;
      })
      .then((locationKey) => {
        getCurrentConditions({ locationKey }).then((currentConditions) => {
          const { Temperature, WeatherText } = currentConditions;
          const temperature = Temperature ? Temperature.Metric.Value : "";
          setTemperatureVal(temperature);
          setWeatherVal(WeatherText);
        });
        getDailyForecasts({ locationKey }).then((DailyForecastsObj) => {
          setDailyForecastList(DailyForecastsObj.DailyForecasts);
        });
      });
  };

  const handleAddRemoveFavorites = () => {
    let favoritesLocationsArr = [...locationsInFavorites];

    if (isLocationInFavorites) {
      favoritesLocationsArr = favoritesLocationsArr.filter(
        (loc) => loc.id !== locationKey
      );

      dispatch(updateFavorites(favoritesLocationsArr));
    } else {
      const currentLocation = {
        id: locationKey,
        city: cityVal,
        temperature: temperatureVal,
        weather: weatherVal,
      };

      favoritesLocationsArr.push(currentLocation);
      dispatch(updateFavorites(favoritesLocationsArr));
    }
  };

  return (
    <Fragment>
      <SearchLocation clicked={handleSearch} />
      <div className="mainContainer">
        <div className="containerTop">
          <div className="currentWeather">
            <label>City: {cityVal}</label>
            <br />
            <label>Temperature: {temperatureVal}</label>
          </div>
          <div className="addToFavorites">
            <button onClick={() => handleAddRemoveFavorites()}>
              {favoritesBtnText}
            </button>
          </div>
        </div>
        <div className="labelContainer">
          <div className="weatherLabel">
            <h1>{weatherVal}</h1>
          </div>
        </div>
        <div className="forcastContainer">
          {dailyForecastList &&
            dailyForecastList.map((dailyForecast, index) => {
              const dateVal = dailyForecast.Date;
              const tempVal = dailyForecast.Temperature.Maximum.Value;
              return (
                <DailyForecast
                  key={index}
                  day={getDayName({ dateVal })}
                  temperature={convertFerToCel({ tempVal })}
                />
              );
            })}
        </div>
      </div>
    </Fragment>
  );
};

export default WeatherDetails;
