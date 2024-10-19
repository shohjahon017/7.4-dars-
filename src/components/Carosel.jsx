import React, { useEffect, useState } from "react";

import { http } from "../axios";

function Carosel() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      http
        .get("products?featured=true")
        .then((response) => {
          setProducts(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    };

    fetchProducts();
  }, []);

  return (
    <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4 mt-20">
      {products.map((product) => (
        <div className="carousel-item " key={product.id}>
          <img
            src={product.attributes.image}
            alt={product.attributes.title}
            className="rounded-box"
            style={{ width: "300px", height: "400px", objectFit: "cover" }}
          />
        </div>
      ))}
    </div>
  );
}

export default Carosel;
