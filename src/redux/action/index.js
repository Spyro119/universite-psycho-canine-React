import { API_URL } from "../../utils/const";

const POSTING = "POSTING";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

// TOKENS
export const getToken = (email, password) => {
  return function(dispatch) {
    dispatch({
      type: POSTING,
    });

    fetch(API_URL + "v1/Authenticate/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({username: email, password: password})
  }).then((data) => {
    data.json().then( (jsonData) => {
      localStorage.setItem('token', JSON.stringify(jsonData.token));
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
  })
  }
}

// REGISTER
export const register = (email, password) => {
  console.log("Register launched");
  return function(dispatch) {
    dispatch({
      type: POSTING,
    });

    fetch(API_URL + "v1/Authenticate/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({username: email, email: email, password: password})
  }).then((data) => {
    data.json().then( (jsonData) => {
      {
        fetch(API_URL + "v1/Authenticate/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
        },
          body: JSON.stringify({username: email, password: password})
        }).then((data) => {
          data.json().then( (jsonData) => {
            localStorage.setItem('token', JSON.stringify(jsonData.token));
            }
          )
      })
      }
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
  })
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
