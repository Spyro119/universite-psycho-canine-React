import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    if (tokenString !== "undefined") { // TO REMOVE
      const userToken = JSON.parse(tokenString);
      return userToken
    } // TO REMOVE
  };

  const [token, setToken] = useState(getToken());
  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}

