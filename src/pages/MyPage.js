import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await api.get("/auth/token", {
          withCredentials: true, 
        });

        const accessToken = response.data.accessToken;
        if (accessToken) {
          localStorage.setItem("Authorization", `Bearer ${accessToken}`);
          console.log("토큰 저장 완료:", accessToken);
        } else {
          console.error("Authorization 헤더 없음");
        }
      } catch (error) {
        console.error("토큰 요청 실패:", error);
      }
    };

    fetchAccessToken();
  }, []);

  useEffect(() => {
    const fetchMypage = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        const response = await api.get("/mypage", {
          headers: {
            Authorization: token ? token : "",
          },
        });

        setUser(response.data.username);
        console.log("마이페이지 로드 성공");
      } catch (error) {
        console.error("인증 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMypage();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("Authorization");
      alert("로그아웃 성공");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <div>
      <h2>마이페이지</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : user ? (
        <p>안녕하세요, {user}님</p>
      ) : (
        <p>유저 정보를 불러올 수 없습니다.</p>
      )}

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;
