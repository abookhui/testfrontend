import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import NaverLogin from "./pages/NaverLogin";
import CameraCapture from "./pages/CameraCapture";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/naverLogin" element={<NaverLogin />} />

        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/picture" element={< CameraCapture />} />
        
      </Routes>
    </Router>

  );
};

export default App;
