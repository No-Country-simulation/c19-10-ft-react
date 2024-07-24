import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "http://localhost:3001/api/v1";

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const response = await axios.post(`${API_URL}/users/refresh-token`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);

    return accessToken;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

export const checkTokenExpiration = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  const decoded = jwtDecode(token);

  if (decoded.exp * 1000 < Date.now()) {
    return false;
  }

  try {
    await refreshToken();
    return true;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    return false;
  }
};
