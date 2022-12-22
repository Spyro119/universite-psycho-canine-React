import { 
  LOADINGREGISTER,
  REGISTERFAIL,
  REGISTERSUCCESS,
  CLEARREGISTER
 } from "../../utils/const"; 

const initialState = {
  status: '',
  errorStatus: null,
  errorMessage: null
}

const registerReducer = ( state = initialState, action ) => {
  switch (action.type) {
    case LOADINGREGISTER:
      state = Object.assign({}, state, { status: "loading", errorStatus: null, errorMessage: null });
      return state;
    case REGISTERSUCCESS:
      return action.payload
    case REGISTERFAIL:
      console.log(action.payload);
      state = Object.assign({}, state, { status: "Failed",errorStatus: action.payload.status, errorMessage: action.payload.title });
      return state;
    case CLEARREGISTER:
      state = initialState;
      return state;
    default: 
      return state
  }
}


export default registerReducer;