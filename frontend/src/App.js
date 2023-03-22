import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/product/:id" element={<ProductDetails />} exact />
        </Routes>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
