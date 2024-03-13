import { AxiosResponse } from "axios";
import authApiClient from "@/packages/apiClient/authApiClient";
import AuthResponse from "../entities/AuthResponse";

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> =>
  authApiClient.post<AuthResponse>("/login", {
    email,
    password,
  });

export const refresh = async (
  refreshToken: string
): Promise<AxiosResponse<AuthResponse>> =>
  authApiClient.post<AuthResponse>("/refresh-token", {
    refresh_token: refreshToken,
  });

export const resetPassword = async (
  email: string
): Promise<AxiosResponse<void>> =>
  authApiClient.post("/password-reset", {
    email,
  });
