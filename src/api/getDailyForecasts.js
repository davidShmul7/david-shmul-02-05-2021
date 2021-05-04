import fetch from "isomorphic-fetch";

/**
 * Description
 * Returns current conditions data for a specific location
 * @param {string} apiKey
 * @param {string} locationKey
 */
export const getDailyForecasts = async ({ locationKey }) => {
  const apiKey = "nksorniD02MKyprdzS4Yq3AahnJdFFMu";
  const endpoint = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    return data || {};
  } catch (error) {
    console.error("error", error);
    return {};
  }
};
