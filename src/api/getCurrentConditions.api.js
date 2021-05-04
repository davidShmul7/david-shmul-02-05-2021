import fetch from "isomorphic-fetch";
//import { currentCondtionsResponse } from "../assets/data/currentConditionsResponse";

/**
 * Description
 * Returns current conditions data for a specific location
 * @param {string} apiKey
 * @param {string} locationKey
 */
export const getCurrentConditions = async ({ locationKey }) => {
  const apiKey = "nksorniD02MKyprdzS4Yq3AahnJdFFMu";
  const endpoint = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    return data[0] || {};
  } catch (error) {
    console.error("error", error);
    return {};
  }
};
