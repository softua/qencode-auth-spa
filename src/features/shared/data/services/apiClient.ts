import axios from "axios";
import { BASE_API_URL, TIMEOUT } from "./constants";

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: TIMEOUT,
});

// Add Authorization header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
