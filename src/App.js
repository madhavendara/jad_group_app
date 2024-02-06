import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Productlisting from "./container/productlisting";
import ProductDetail from "./container/ProductDetail";
import Inventorylist from "./container/Inventorylist";
import Header from "./container/Header";
import Footer from "./container/Footer";
function App() {
  return (
    <BrowserRouter basename="">
      <Header />
      <Routes>
        <Route path="/inventorylist" element={<Inventorylist />} />
        <Route path="/productDetails" element={<ProductDetail />} />
        <Route path="/" element={<Productlisting />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
