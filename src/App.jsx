import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeContext } from "./components/Theme";
import { CartProvider, useCart } from "./components/CartContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Details from "./pages/Details";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Checkout from "./pages/Checkout";
import MainLayout from "./layouts/MainLayout";

function App() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      if (
        !(
          location.pathname == "/" ||
          location.pathname.includes("register") ||
          location.pathname.includes("about") ||
          location.pathname.includes("products") ||
          location.pathname.includes("cart")
        )
      ) {
        navigate("/login");
      }
    }
  }, []);

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children;
  }
  return (
    <div
      className={`container mx-auto ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Routes>
        <Route
          path="/"
          element={
            <CartProvider>
              {" "}
              <MainLayout>
                <Home></Home>
              </MainLayout>
            </CartProvider>
          }
        ></Route>
        <Route
          path="/about"
          element={
            <MainLayout>
              <About></About>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products></Products>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/orders"
          element={
            <MainLayout>
              {" "}
              <PrivateRoute>
                <Orders></Orders>
              </PrivateRoute>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart></Cart>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/products/:id"
          element={
            <MainLayout>
              <Details></Details>
            </MainLayout>
          }
        ></Route>
        <Route path="/register" element={<Register></Register>}></Route>

        <Route path="/login" element={<Login></Login>}></Route>

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              {" "}
              <MainLayout>
                <Checkout></Checkout>
              </MainLayout>
            </PrivateRoute>
          }
        ></Route>

        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
