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
  email: string,
  redirectUrl: string
): Promise<AxiosResponse<void>> =>
  authApiClient.post("/password-reset", {
    email,
    redirect_url: redirectUrl,
  });

export const setPassword = async (
  token: string,
  secret: string,
  password: string,
  passwordConfirm: string
): Promise<AxiosResponse<void>> =>
  authApiClient.post("/password-set", {
    token,
    secret,
    password,
    password_confirm: passwordConfirm,
  });
