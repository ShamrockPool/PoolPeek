const walletReducer = function (state = "", action) {
    switch (action.type) {
      case "nami":
        return state + "nami";
      case "flint":
        return state + "flint";
      case "ccvault":
        return state + "ccvault";
      default:
        return state;
    }
  };
  export default walletReducer;