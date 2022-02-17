const countReducer = function (state = "", action) {
  switch (action.type) {
    case "nami":
      return "nami";
    case "flint":
      return "flint";
    case "ccvault":
      return "ccvault";
    default:
      return state;
  }
};
export default countReducer;