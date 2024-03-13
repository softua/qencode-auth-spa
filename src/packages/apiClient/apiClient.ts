import axios from "axios";
import { BASE_API_URL, TIMEOUT } from "./constants";
import addTokenRequestInterceptor from "./interceptors/addTokenRequestInterceptor";

const apiClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: TIMEOUT,
});

// Add Authorization header
apiClient.interceptors.request.use(addTokenRequestInterceptor);

export default apiClient;
