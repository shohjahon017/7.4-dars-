import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../axios";

function Details() {
  const [product, setProduct] = useState({});
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState(1);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    http
      .get(`products/${id}`)
      .then((data) => {
        if (data.status === 200) {
          setProduct(data.data.data);

          setColor(data.data.data.attributes.colors[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  function handleAddToBag() {
    const card = {
      id: product.id,
      title: product.attributes.title,
      color,
      amount,
    };
    const cards = JSON.parse(localStorage.getItem("data")) || [];
    cards.push(card);
    localStorage.setItem("data", JSON.stringify(cards));
  }
  return (
    <div className="container mx-auto my-40 ">
      {product.id && (
        <div className="flex gap-10">
          <img
            className=" ml-40 w-1/3 h-[600px] rounded-lg object-cover"
            src={product.attributes.image}
            alt=""
          />
          <div className="w-1/2 mt-10">
            <h3 className="text-4xl font-bold mb-4">
              {product.attributes.title}
            </h3>
            <p className="text-gray-600 mb-6">
              {product.attributes.description}
            </p>
            <h3 className="text-2xl font-bold mb-6">
              ${product.attributes.price}
            </h3>

            <h4 className="text-2xl font-bold ">Colors</h4>
            <div className="flex space-x-2 mb-4">
              {product.attributes.colors &&
                product.attributes.colors.map((colorProduct) => (
                  <span
                    key={colorProduct}
                    style={{
                      backgroundColor: colorProduct,
                      border:
                        color === colorProduct ? "2px solid black" : "none",
                    }}
                    onClick={() => {
                      setColor(colorProduct);
                    }}
                    className="block w-8 h-8 rounded-full cursor-pointer transition duration-200 transform hover:scale-110"
                  ></span>
                ))}
            </div>
            <div>
              <h4 className="text-2xl font-bold">Amount</h4>
              <input
                className="p-3 border rounded-md mb-6"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              onClick={handleAddToBag}
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              Add to Bag
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
