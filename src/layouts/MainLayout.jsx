import React, { useContext } from "react";
import { ThemeContext } from "../components/Theme";
import { useCart } from "../components/CartContext";
import korzinka from "../assets/korzinka.svg";
import sun from "../assets/sun.svg";
import moon from "../assets/moon.svg";

function MainLayout({ children }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { cart } = useCart();

  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between p-4 px-40 bg-slate-100 items-center">
        <h3 className="p-2 text-white text-3xl bg-blue-500 rounded-md w-12 text-center cursor-pointer hover:bg-blue-600">
          C
        </h3>
        <div>
          <a
            href="/"
            className="mx-2 hover:bg-gray-300 hover:rounded-md p-2 hover:text-white active:bg-black"
          >
            Home
          </a>
          <a
            href="/about"
            className="mx-2 hover:bg-gray-300 hover:rounded-md p-2 hover:text-white active:bg-black"
          >
            About
          </a>
          <a
            href="/products"
            className="mx-2 hover:bg-gray-300 hover:rounded-md p-2 hover:text-white active:bg-black"
          >
            Products
          </a>
          <a
            href="/cart"
            className="mx-2 hover:bg-gray-300 hover:rounded-md p-2 hover:text-white active:bg-black"
          >
            Cart
          </a>
        </div>
        <div className="flex gap-6">
          {" "}
          <button
            onClick={toggleTheme}
            className="p-2   hover:bg-slate-200 rounded-full  "
          >
            <img src={theme === "dark" ? sun : moon} alt="" width={20} />
          </button>
          <div className="flex items-center cursor-pointer   rounded-full px-3 py-2 hover:bg-slate-200">
            <img className="mr-2  " src={korzinka} width={20} alt="Cart" />
            {cart.length && (
              <span className="rounded-full bg-white text-blue-500 px-2 py-1 ml-2">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}

export default MainLayout;
