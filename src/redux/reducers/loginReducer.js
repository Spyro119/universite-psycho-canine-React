const loginReducer = (state = [], action) => {
  switch (action.type) {
    case "success":
      return state + 1;
    case "failure":
      return state - 1;
    default: 
      return state
  }
}

export default loginReducer;