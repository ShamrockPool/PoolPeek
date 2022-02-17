import { combineReducers } from 'redux'
import walletReducer from './walletReducer';
import countReducer from './countReducer';

const rootReducer  = combineReducers({
  counter: countReducer, wallet: walletReducer
});
export default rootReducer;