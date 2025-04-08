import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ProductionNoContext = createContext();

export const ProductionOrderNoProvider = ({children}) => {
  const auth = useSelector(state => state.auth);
  const token = auth.token;
  const [productionDrop, setProductionDrop] = React.useState('');
  const [prodcutionOrder, setProductionOrder] = useState([]);

  const handleProductionChange = (event) => {
    setProductionDrop(event.target.value);
  };

  const fetchProductionOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/ap/admin/odbc/production/orders`, {
        headers: {
          'x-access-token': token
        }
      });
      const data = response.data.data;
      setProductionOrder(data);
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (token) {
      fetchProductionOrders();
      const intervalId = setInterval(fetchProductionOrders, 5000);

      return () => clearInterval(intervalId);
    }


  }, [])

  return (
    <ProductionNoContext.Provider value={{prodcutionOrder, handleProductionChange, productionDrop}}>
      {children}
    </ProductionNoContext.Provider>
  );
};
