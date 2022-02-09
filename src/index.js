import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Album from "./routes/album";
import Playlist from "./routes/playlist";
import Release from "./routes/release";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/callback" element={<App />} />
      <Route path="/albums/:id" element={<Album />} />
      <Route path="/playlists/:id" element={<Playlist />} />
      <Route path="/releases/:id" element={<Release />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
