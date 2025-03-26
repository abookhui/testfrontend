import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import NaverLogin from "./pages/NaverLogin";
import CameraCapture from "./pages/CameraCapture";

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA 설치 완료");
        } else {
          console.log("PWA 설치 거절");
        }
        setDeferredPrompt(null);
        setShowInstallButton(false);
      });
    }
  };

  return (
    <>
      {/* 설치 버튼 */}
      {showInstallButton && (
        <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
          <button onClick={handleInstallClick} style={{ padding: "10px 20px", fontSize: "16px" }}>
            앱 설치하기
          </button>
        </div>
      )}

      {/* 라우터 설정 */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/naverLogin" element={<NaverLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/picture" element={<CameraCapture />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
