import React, { useContext, useState } from "react";
import { ProductContext } from "./utils/Context";
import { Link } from "react-router-dom";

const Nav = ({ setSelectedCategory, setSearchQuery }) => {
  const { products } = useContext(ProductContext) || []; // Safe fallback

  const [query, setQuery] = useState("");

  // Optimized Category Extraction
  // const category = [...new Set(products.map((p) => p.category))];
  const category = Array.isArray(products)
    ? [...new Set(products.map((p) => p.category))]
    : [];

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Use navigate instead of reload for better SPA behavior
    window.location.replace("/"); // or use navigate('/') if using React Router v6
  };

  // Reset Category filter when "Add Product" is clicked
  const handleAddProduct = () => {
    setSelectedCategory(""); // Reset category filter
  };

  return (
    <>
      {/* Left Sidebar */}
      <nav className='w-[20%] h-full bg-zinc-100 flex flex-col items-center pt-5'>
        <Link
          className='mt-20 py-4 px-5 border rounded text-white text-xl bg-blue-600 hover:bg-blue-700 transition'
          to={"/add-products"} // Reset category
          onClick={handleAddProduct}
        >
          Add Products
        </Link>
        <hr className='my-3 w-[80%]' />
        <h1 className='text-2xl mb-3 w-[80%]'>Category Filter</h1>
        <div className='w-[80%]'>
          {category.map((c, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(c)}
              className='flex items-center mb-3 hover:text-blue-600 transition'
            >
              <span className='rounded-full mr-2 w-[15px] h-[15px] bg-blue-400'></span>
              {c}
            </button>
          ))}
        </div>
      </nav>

      {/* Top Navbar */}
      <nav className='w-screen h-[10%] bg-zinc-100 flex justify-evenly items-center absolute overflow-y-auto'>
        <h1 className='mr-5 text-4xl font-bold text-blue-600'>
          Product Listing
        </h1>

        {/* Search Box */}
        <div className='flex items-center gap-2'>
          <input
            type='text'
            placeholder='Search Product'
            className='py-2 px-4 border rounded text-black text-lg bg-white focus:ring-2 focus:ring-blue-500'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className='py-2 px-5 border rounded text-white text-lg bg-blue-600 hover:bg-blue-700 transition'
            onClick={() => setSearchQuery(query)}
          >
            Search
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className='py-2 px-6 border rounded text-white text-lg bg-red-600 hover:bg-red-700 transition cursor-pointer'
        >
          Logout
        </button>
      </nav>
    </>
  );
};

export default Nav;
