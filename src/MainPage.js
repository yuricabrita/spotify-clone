import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Album from "./routes/album";
import Albums from "./routes/albums";
import Artist from "./routes/artist";
import Login from "./routes/login";
import Playlist from "./routes/playlist";
import Release from "./routes/release";
import Callback from "./routes/callback";
import App from "./App";

export default function MainPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="dashboard/albums/:id" element={<Album />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="dashboard/playlists/:id" element={<Playlist />} />
        <Route path="dashboard/releases/:id" element={<Release />} />
        <Route path="dashboard/artists/:id" element={<Artist />} />
      </Routes>
    </BrowserRouter>
  );
}
