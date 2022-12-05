const initialState = { data: [], status:"" };

const tokenReducer = (state = "", action) => {
  console.log(`action = ${action.type}`);
  switch (action.type) {
    case "POSTING":
      state = Object.assign({}, state, {token: "", status: "waiting"});
      return null;
    case "SUCESS":
      // console.log("login in");
      localStorage.setItem('refresh_token', JSON.stringify(action.payload.refreshToken));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem('expirationDate', JSON.stringify(action.payload.expiration));
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