const registerReducer = (state = "", action) => {
  switch (action.type) {
    case "POSTING":
      return null;
    case "SUCESS":
      console.log(action.payload);
      return action.payload
    case "FAILURE":
      console.log(action.payload);
      return action.payload;
    default: 
      return state
  }
}

export default registerReducer;