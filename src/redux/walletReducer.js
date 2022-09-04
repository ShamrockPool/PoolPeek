const walletReducer = (state = "", action) => {
  console.log(action)
  switch (action.type) {
    case "Select_wallet":
      return action.wallet;
    case "Remove_wallet":
      return null;
    default:
      return state;
  }
}

export default walletReducer;