// src/hooks/useAuthGuard.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, []);
}
