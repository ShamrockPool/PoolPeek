import { createStore } from 'redux';
import rootReducer  from 'redux/reducer';
import countReducer from './countReducer';

const store = createStore(countReducer );

export default store;
