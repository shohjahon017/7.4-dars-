import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../components/Theme";
import Carosel from "../components/Carosel";
import { http } from "../axios";
import { useNavigate } from "react-router-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    http
      .get("products?featured=true")
      .then((data) => {
        setProducts(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function handleClick(e) {
    e.preventDefault();
    navigate("/products");
  }
  function handleRedirect(id) {
    navigate(`products/${id}`);
  }

  return (
    <div
      className={`container mx-auto justify-center mb-5 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className=" flex gap-10">
        <div className="mt-20 ml-44 ">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-600 sm:text-6xl">
            We are changing the way people shop
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 mb-20">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <button
            onClick={handleClick}
            className="p-3 rounded-md text-white bg-blue-600 mb-16 "
          >
            Our Products
          </button>
        </div>
        <div>
          <Carosel></Carosel>
        </div>
      </div>

      <h3 className="font-medium text-3xl mx-44 text-gray-600 mb-5 border-b border-base-300 pb-5">
        Featured Products
      </h3>

      <div className=" container mx-auto justify-center flex flex-wrap gap-3">
        {products.length > 0 &&
          products.map(function (product) {
            return (
              <div
                key={product.id}
                onClick={() => {
                  handleRedirect(product.id);
                }}
                className="w-1/4 shadow-md rounded-xl justify-center border p-3 cursor-pointer"
              >
                <img
                  className="h-[200px]  w-full object-cover rounded-xl mb-3"
                  src={product.attributes.image}
                  alt=""
                />
                <h3 className="text-center mb-2 ">
                  {product.attributes.title}
                </h3>
                <h3 className="text-center text-gray-500">
                  ${product.attributes.price}
                </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
