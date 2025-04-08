import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const auth = useSelector(state => state.auth);
  const token = auth.token;
  const [userDrop, setUserDrop] = React.useState('');
  const [user, setUser] = useState([]);

  const handleUserChange = (event) => {
    setUserDrop(event.target.value);
  };

  const fetchAllRegisterUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/all/users`, {
        headers: {
          'x-access-token': token
        }
      });
      const data = response.data.data;
      setUser(data);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (token) {
      fetchAllRegisterUser();
      const intervalId = setInterval(fetchAllRegisterUser, 5000);
      return () => clearInterval(intervalId);
    }


  }, [])

  return (
    <UserContext.Provider value={{user, handleUserChange, userDrop}}>
      {children}
    </UserContext.Provider>
  );
};
