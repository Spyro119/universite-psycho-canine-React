const initialState = { data: [], status:"" };

const tokenReducer = (state = "", action) => {
  switch (action.type) {
    case "POSTING":
      state = Object.assign({}, state, {token: "", status: "waiting"});
      return null;
    case "SUCESS":
      console.log(action.payload);
      state = Object.assign({}, state, {data: [...action.payload], status: "received"});
      return action.payload
    case "FAILURE":
      state = Object.assign({}, state, {status: "failed", error: action.payload});
      return action.payload;
    default: 
      return state
  }
}

export default tokenReducer;