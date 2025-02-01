import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ProductContext = createContext();

const Context = ({children}) => {
  const [products, setproducts] = useState([]);
  
  const getproducts = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");
      setproducts(data);
    } catch (error) {
      console.log( "Error Fetching products"  ,error);
    }
  };

  useEffect(() => {
    getproducts();
  }, []);

  return (
    <ProductContext.Provider value={{products, setproducts}}>
      {children}
    </ProductContext.Provider>
  );
};

export default Context;
