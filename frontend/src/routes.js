import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Apod from "./pages/Apod";
import MarsRover from "./pages/MarsRover";
import Epic from "./pages/Epic";
import NeoStats from "./pages/NeoStats";
import ImageSearch from "./pages/ImageSearch";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import MarsPhotoStats from "./pages/MarsPhotoStats";

class AppRoutes extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apod" element={<Apod />} />
          <Route path="/mars-rover" element={<MarsRover />} />
          <Route path="/epic" element={<Epic />} />
          <Route path="/neo-stats" element={<NeoStats />} />
          <Route path="/search-images" element={<ImageSearch />} />
          <Route path="/mars-stats" element={<MarsPhotoStats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
