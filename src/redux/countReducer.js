const countReducer = function (state = "", action) {
  switch (action.type) {
    case "nami":
      return "nami";
    case "flint":
      return "flint";
    case "ccvault":
      return "ccvault";
    case "typhon":
      return "typhon";
    case "yoroi":
      return "yoroi";
    default:
      return state;
  }
};
export default countReducer;