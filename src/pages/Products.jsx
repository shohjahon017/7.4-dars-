import React, { useEffect, useState } from "react";
import { http } from "../axios";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get("products")
      .then((data) => {
        setProducts(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleRedirect(id) {
    navigate(`products/${id}`);
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {products.length > 0 &&
        products.map(function (product) {
          return (
            <div
              key={product.id}
              onClick={() => {
                handleRedirect(product.id);
              }}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 shadow-md rounded-xl border p-3 cursor-pointer "
            >
              <img
                className="h-[200px] w-full object-cover rounded-xl mb-3"
                src={product.attributes.image}
                alt=""
              />
              <h3 className="text-center mb-2">{product.attributes.title}</h3>
              <h3 className="text-center text-gray-500">
                ${product.attributes.price}
              </h3>
            </div>
          );
        })}
    </div>
  );
}

export default Products;
