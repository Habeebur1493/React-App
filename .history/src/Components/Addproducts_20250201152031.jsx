import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddProduct = ({ selectedProduct, setSelectedProduct }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const navigate = useNavigate();

  // ✅ Agar koi product update ho raha ho toh uski details form me load ho
  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("products")) || [];

    if (selectedProduct) {
      // ✅ Update existing product
      products = products.map((p) =>
        p.title === selectedProduct.title ? formData : p
      );
    } else {
      // ✅ Add new product
      products.push(formData);
    }

    localStorage.setItem("products", JSON.stringify(products));
    setFormData({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
    });
    toast.success("Product added successfully!");
    navigate("/show-products");
    setSelectedProduct(null);
  };

  return (
    <div className='w-[30%] h-[80%] mx-auto bg-blue-100 p-6 rounded-lg shadow-lg mt-10'>
      <h2 className='text-2xl font-bold mb-5 text-center text-blue-600'>
        {selectedProduct ? "Update Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-lg font-medium'>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
            placeholder='Enter product title'
            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='block text-lg font-medium'>Price ($)</label>
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            required
            placeholder='Enter price'
            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='block text-lg font-medium'>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
            placeholder='Enter product description'
            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='block text-lg font-medium'>Image URL</label>
          <input
            type='url'
            name='image'
            value={formData.image}
            onChange={handleChange}
            required
            placeholder='Paste image URL'
            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <div>
          <label className='block text-lg font-medium'>Category</label>
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
            placeholder='Enter category'
            className='w-full p-2 border rounded focus:ring-2 focus:ring-blue-500'
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition'
        >
          {selectedProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
