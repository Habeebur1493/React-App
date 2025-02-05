import React, { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login.jsx";
import Home from "./Components/Home.jsx";
import Details from "./Components/Details.jsx";
import About from "./Components/About.jsx";
import Services from "./Components/Services.jsx";
import Contact from "./Components/Contact.jsx";
import Addproducts from "./Components/Addproducts.jsx";
import ShowProducts from "./Components/ShowProducts.jsx";

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className='h-screen w-screen flex'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/add-products' element={<Addproducts />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/show-products'element={<ShowProducts
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
