import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const mahineContext = createContext();

export const MachineProvider = ({children}) => {
  const auth = useSelector(state => state.auth);
  const token = auth.token;
  const [machineDrop, setMachineDrop] = React.useState('');
  const [machine, setMachine] = useState([]);

  const handleMachineChange = (event) => {
    setMachineDrop(event.target.value);
  };

  const fetchAllMachine = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/get/machines`, {
        headers: {
          'x-access-token': token
        }
      });
      const data = response.data.data;
      setMachine(data);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (token) {
      fetchAllMachine();
      const intervalId = setInterval(fetchAllMachine, 5000);
      return () => clearInterval(intervalId);
    }


  }, [])

  return (
    <mahineContext.Provider value={{machine, handleMachineChange, machineDrop}}>
      {children}
    </mahineContext.Provider>
  );
};
