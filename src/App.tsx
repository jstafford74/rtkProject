import React, { useEffect } from 'react';
import logo from "./logo.svg";
import type { Unsubscribe } from '@reduxjs/toolkit';
import  { startAppListening } from './app/store';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {setupPostsListener} from './features/postListSlice'
import LinkPage from "./Pages/LinkPage";
import Posts from "./components/Posts/Posts";

import "./App.css";

function App() {

  useEffect(() => {
    const subscriptions: Unsubscribe[] = [
      setupPostsListener(startAppListening),
     
    ];

    return () => subscriptions.forEach((unsubscribe) => unsubscribe());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LinkPage />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
}

export default App;
