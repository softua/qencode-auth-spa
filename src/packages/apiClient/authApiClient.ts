import axios from "axios";
import { BASE_AUTH_URL, TIMEOUT } from "./constants";

const authApiClient = axios.create({
  baseURL: BASE_AUTH_URL,
  timeout: TIMEOUT,
});

export default authApiClient;
