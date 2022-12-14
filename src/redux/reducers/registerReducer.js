import { 
  LOADINGREGISTER,
  REGISTERFAIL,
  REGISTERSUCCESS,
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
      state = Object.assign({}, state, { status: "Failed",errorStatus: action.payload.status, errorMessage: action.payload.message });
      return state;
    default: 
      return state
  }
}


export default registerReducer;