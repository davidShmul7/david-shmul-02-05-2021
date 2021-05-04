import fetch from "isomorphic-fetch";

/**
 * Description
 * Returns basic information about locations matching an autocomplete of the search text.
 *
 * @param {string} apiKey
 * @param {string} searchText
 */
export const getLocationByAutoComplete = async ({ searchText }) => {
  const apiKey = "nksorniD02MKyprdzS4Yq3AahnJdFFMu";
  const endpoint = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${searchText}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    const { Key, LocalizedName } = data[0];

    return { locationKey: Key, city: LocalizedName } || {};
  } catch (error) {
    console.error("error", error);
    return {};
  }
};
