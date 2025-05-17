import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const RouteContext = createContext();

export const RouteProvider = ({children}) => {
  const auth = useSelector(state => state.auth);
  const token = auth.token;
  const [routeDrop, setRouteDrop] = React.useState('');
  const [route, setRoute] = useState([]);

  const handleRouteChange = (event) => {
    setRouteDrop(event.target.value);
  };

  const fetchAllRoute = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/all/routes`, {
        headers: {
          'x-access-token': token
        }
      });
      const data = response.data.data;
      // console.log("data",data)
      setRoute(data);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (token) {
      fetchAllRoute();
      const intervalId = setInterval(fetchAllRoute, 5000);
      return () => clearInterval(intervalId);
    }


  }, [])

  return (
    <RouteContext.Provider value={{route, handleRouteChange, routeDrop}}>
      {children}
    </RouteContext.Provider>
  );
};
