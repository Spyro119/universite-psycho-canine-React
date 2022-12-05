import { API_URL } from "../../utils/const";
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Login from "../../pages/login/Login";

const loading = "loading";
const fetchToken = "fetchToken";
const httpError = "httpError";
const POSTING = "POSTING";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE"

// TOKENS
export const getToken = (email, password) => {
  return function(dispatch) {
    dispatch({
      type: loading,
    });

    return fetch(API_URL + "v1/Authenticate/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({username: email, password: password})
  }).then((data) => data.json())
    .then( (jsonData) => {
      localStorage.setItem('refresh_token', JSON.stringify(jsonData.refreshToken));
      localStorage.setItem('token', JSON.stringify(jsonData.token));
      localStorage.setItem('expirationDate', JSON.stringify(jsonData.expiration));
      localStorage.SetItem('email', JSON.stringify(email));
      return dispatch({
          type: fetchToken,
          payload: jsonData
        })
      })
    .catch(error => dispatch({
      type: httpError,
      payload: error
    }))
  }
}


// REGISTER
export const register = (email, password) => {
  return function(dispatch) {
    dispatch({
      type: POSTING,
    });

    return fetch(API_URL + "v1/Authenticate/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({username: email, email: email, password: password})
  }).then((data) => data.json())
    .then( (jsonData) => {
      return getToken(email, password);
      }
    )
    .catch(error => dispatch({
      type: FAILURE,
      payload: error
    }))
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
