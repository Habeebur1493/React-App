import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { ProductContext } from "./utils/Context";
import Loading from "./Loading";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const { products } = useContext(ProductContext) || [];
  console.log(products);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchQuery, products]);

  const filterProducts = async () => {
    let updatedProducts = products;

    if (selectedCategory) {
      try {
        const { data } = await axios.get(
          `https://fakestoreapi.com/products/category/${selectedCategory}`
        );
        updatedProducts = data;
      } catch (error) {
        console.log(error);
      }
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  };

  if (!products) {
    return <Loading />;
  }

  return (
    <>
      <Nav
        setSelectedCategory={setSelectedCategory}
        setSearchQuery={setSearchQuery}
      />
      <div className='w-[85%] px-3 py-25 flex flex-wrap overflow-x-hidden overflow-y-auto'>
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((p) => (
            <div
              key={p.id}
              className='mr-3 mb-3 card p-3 border shadow rounded w-[18%] h-[30vh] flex-col flex justify-center items-center'
            >
              <div
                className='hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center'
                style={{ backgroundImage: `url(${p.image})` }}
              ></div>
              <Link to={`/details/${p.id}`}>
                <h1 className='hover:text-blue-300'>{p.title}</h1>
              </Link>
            </div>
          ))
        ) : (
          <h1 className='text-center text-3xl'>No products found</h1>
        )}
      </div>
    </>
  );
};

export default Home;
