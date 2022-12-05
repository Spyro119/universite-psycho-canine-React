import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import tokenReducer from './tokenReducer';

const reducers = combineReducers({
  login: loginReducer,
  register: registerReducer,
  token: tokenReducer
});

export default reducers