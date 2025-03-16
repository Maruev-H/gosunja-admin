import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = "http://217.114.4.176:5000/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Перехватчик для автоматического добавления accessToken
api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Перехватчик ответа для обновления accessToken при 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) throw new Error("Нет refreshToken");

        const refreshResponse = await axios.create()({
          method: "post",
          url: `${BASE_URL}/auth/refresh`,
          data: { refreshToken },
        });

        const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
        Cookies.set("accessToken", accessToken);
        if (newRefreshToken) Cookies.set("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return await api(originalRequest);
      } catch (err) {
        console.error("Ошибка обновления токена:", err);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/auth";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
