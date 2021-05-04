export const updateFavorites = (locations) => {
  return {
    type: "UPDATE_FAVORITES",
    payload: locations,
  };
};
