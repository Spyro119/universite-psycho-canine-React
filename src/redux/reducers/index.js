import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import tokenReducer from './tokenReducer';

const reducers = combineReducers({
  register: registerReducer,
  token: tokenReducer
});

export default reducers