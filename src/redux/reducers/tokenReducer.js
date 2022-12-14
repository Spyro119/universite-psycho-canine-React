import { 
  LOADINGTOKEN,
  FETCHTOKENFAIL,
  FETCHTOKENSUCCESS,
  CLEARTOKENERROR
 } from "../../utils/const"; 

const initialState = {
  status: '',
  errorStatus: null,
  errorMessage: null
}


const tokenReducer = (state = initialState, action) => {
  console.log(`action = ${action.type}`);
  console.log(action);
  switch (action.type) {
    case LOADINGTOKEN:
      return {
        ...state,
        status: 'loading'
      }
    case FETCHTOKENSUCCESS:
      localStorage.setItem('refresh_token', JSON.stringify(action.payload.refreshToken));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('expirationDate', JSON.stringify(action.payload.expiration));
      return action.payload
    case FETCHTOKENFAIL:
    return {
      ...state,
      status: 'failed',
      errorStatus: action.payload.status,
      errorMessage: action.payload.title
    }
    case CLEARTOKENERROR:
      return initialState;
    default: 
      return state
  }
}

export default tokenReducer;