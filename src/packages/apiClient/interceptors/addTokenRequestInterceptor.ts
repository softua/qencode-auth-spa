import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/packages/storage";
import { InternalAxiosRequestConfig } from "axios";
import authApiClient from "../authApiClient";

const MIN_EXPIRATION: number = 30000;
let refreshTokenPromise: Promise<AuthTokenResponse | null> | null;

export default async function addTokenRequestInterceptor(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  const accessToken = await getAccessToken();
  if (!accessToken) return config;
  if (isTokenValid(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  // Try to get refresh token and use it to update both tokens
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    refreshTokenPromise ??= updateAndGetRefreshedTokens(refreshToken);
    const newTokens = await refreshTokenPromise;
    refreshTokenPromise = null;
    config.headers.Authorization = `Bearer ${newTokens?.access_token}`;
  }

  return config;
}

const parseJwt = (token: string): { exp: number } | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

const isTokenValid = (token: string): boolean => {
  const payload = parseJwt(token);
  if (!payload) return false;

  return payload.exp - Date.now() > MIN_EXPIRATION;
};

const updateAndGetRefreshedTokens = async (
  token: string
): Promise<AuthTokenResponse | null> => {
  try {
    const response = await authApiClient.post<AuthTokenResponse>(
      "/refresh-token",
      {
        refresh_token: token,
      }
    );
    const { access_token, refresh_token } = response.data;
    await Promise.all([
      setAccessToken(access_token),
      setRefreshToken(refresh_token),
    ]);
    return { access_token, refresh_token };
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface AuthTokenResponse {
  access_token: string;
  refresh_token: string;
}
