const walletReducer = function (state = "", action) {
  switch (action.type) {
    case "nami":
      return state + "nami";
    case "flint":
      return state + "flint";
    case "eternl":
      return state + "eternl";
    case "typhon":
      return state + "typhon";
    case "yoroi":
      return state + "yoroi";
    case "gero":
      return state + "gero";
    default:
      return state;
  }
};
export default walletReducer;