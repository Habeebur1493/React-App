import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShowProducts = ({ setSelectedProduct }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // ✅ Product delete karega
  const handleDelete = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // ✅ Edit ke liye product set karega
  const handleEdit = (product) => {
    console.log("first");
    setSelectedProduct(product);
    navigate("/add-products");
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center text-blue-600">
        All Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="text-lg font-bold">{product.title}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm font-semibold mt-1">
                Category: {product.category}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowProducts;
