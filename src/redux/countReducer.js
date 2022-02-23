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
      case "gero":
        return "gero";      
    default:
      return state;
  }
};
export default countReducer;