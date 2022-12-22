import { ExitStatus } from "typescript";
import {
  LOADINGTOKEN,
  FETCHTOKENSUCCESS,
  FETCHTOKENFAIL,
  LOADINGREGISTER,
  // REGISTERSUCCESS,
  REGISTERFAIL,
  API_URL
} from "../../utils/const";

const POSTING = "POSTING";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

// TOKENS
export const getToken = (email, password) => {
  return function(dispatch) {
    dispatch({
      type: LOADINGTOKEN,
    });

    return fetch(API_URL + "v1/Authenticate/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({username: email, password: password})
  }).then((data) => data.json())
    .then( (jsonData) => {
      if (jsonData.status >= 400) {
        return dispatch({
          type: FETCHTOKENFAIL,
          payload: jsonData
        })
      }
      return dispatch({
          type: FETCHTOKENSUCCESS,
          payload: jsonData
        })
      })
    .catch(error => dispatch({
      type: FETCHTOKENFAIL,
      payload: error
    }))
  }
}


// REGISTER
export const register = (email, password) => {
  return function(dispatch) {
    dispatch({
      type: LOADINGREGISTER,
    });

    return fetch(API_URL + "v1/Authenticate/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({username: email, email: email, password: password})
  }).then((data) => data.json())
    .then( (jsonData) => {
      console.log(jsonData);
      if (jsonData.status === 400) {
        return dispatch({
          type: REGISTERFAIL,
          payload: jsonData
        })
      } if (jsonData.status !== 400) { 
          return getToken(email, password);
        }
      }
    )
    .catch(error => {
      console.log(error);
      return dispatch({
        type: REGISTERFAIL,
        payload: error
      })
    })
  }
}


export const logOut = () => {
  let email = localStorage.getItem('email');
  return function(dispatch) {
    dispatch({
      type: POSTING,
    });

    return fetch(API_URL + `v1/Authenticate/revoke/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({})
    }).then((data) => data.json())
      .then( (jsonData) => {
        console.log(jsonData);
        // localStorage.clear();
          return dispatch({
            type: SUCCESS,
            payload: jsonData
          })
        }
      )
      .catch(error => {
        console.log(error);
        return dispatch({
          type: FAILURE,
          payload: error
        })
      })
    };
}

export const clearState = (_actionType) => {
  return function(dispatch) {
    return dispatch({
      type: _actionType,
    });
  }
}

const refreshToken = () => {
  var refresh_token = localStorage.getItem("refresh_token");
  var expired_token = localStorage.getItem("token");
  return function(dispatch) {
    dispatch({
      type: POSTING,
    })
    fetch(API_URL + `v1/Authenticate/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({refreshToken: refresh_token, accessToken: expired_token})
    }).then((data) => {
      data.json().then( (jsonData) => {
        localStorage.setItem('token', JSON.stringify(jsonData.token));
        localStorage.setItem('refresh_token', JSON.stringify(jsonData.refreshToken));
          dispatch({
            type: SUCCESS,
            payload: jsonData
          })
        }
      )
      .catch(error => dispatch({
        type: FAILURE,
        payload: error
      }))
    });
  }
}



// export const getToken = async (email, password) => {
 
//   let result =  await fetch(API_URL + "v1/Authenticate/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//   },
//     body: JSON.stringify({username: email, password: password})
//   }).then((data) => {
//     data.json().then((jsonData) => {
//       console.log(jsonData);
//       return (dispatch) => {
//         dispatch({
//           type: "GET_TOKEN",
//           payload: jsonData.token
//         })
//       }
//     })
//   })
  
// }
