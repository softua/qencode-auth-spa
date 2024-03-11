import { AxiosResponse } from "axios";
import authApiClient from "../../../shared/data/services/authApiClient";
import AuthResponse from "../entities/AuthResponse";

const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> =>
  authApiClient.post<AuthResponse>("/login", {
    email,
    passowrd: password,
  });

const refresh = async (
  refreshToken: string
): Promise<AxiosResponse<AuthResponse>> =>
  authApiClient.post<AuthResponse>("/refresh-token", {
    refresh_token: refreshToken,
  });

export default { login, refresh };
