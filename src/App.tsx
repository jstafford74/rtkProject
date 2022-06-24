import React from "react";
import logo from "./logo.svg";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import LinkPage from "./Pages/LinkPage";
import Posts from "./components/Posts/Posts";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LinkPage />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
