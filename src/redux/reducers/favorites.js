const favoritesReducer = (state = "", action) => {
  switch (action.type) {
    case "UPDATE_FAVORITES":
      return [...action.payload];
    default:
      return state;
  }
};

export default favoritesReducer;
