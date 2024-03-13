import { create } from "zustand";
import { devtools } from "zustand/middleware";
import RequestStatus from "../../shared/data/entities/RequestStatus";
import authService from "../data/services/authService";
import {
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/packages/storage";
import AuthStore from "./AuthStore";
import { isAxiosError } from "axios";

const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      status: RequestStatus.initial,
      checkAuthstatus: RequestStatus.initial,
      isAuthorized: false,
      accessToken: null,
      loginError: null,

      login: async (email: string, passowrd: string) => {
        set({ status: RequestStatus.processing, loginError: null });
        try {
          const response = await authService.login(email, passowrd);
          const { access_token, refresh_token } = response.data;
          await Promise.all([
            setAccessToken(access_token),
            setRefreshToken(refresh_token),
          ]);
          set({
            isAuthorized: true,
            status: RequestStatus.success,
            accessToken: access_token,
          });
        } catch (error) {
          let errorMessage = "Something went wrong";
          if (isAxiosError(error)) {
            const statusCode = error.response?.status;
            if (statusCode === 401) {
              errorMessage = "Please enter correct email and password";
            } else if (statusCode === 422) {
              errorMessage = "Validation error";
            }
          }
          set({
            loginError: errorMessage,
            status: RequestStatus.fail,
            isAuthorized: false,
            accessToken: null,
          });
        }
      },

      checkAuth: async () => {
        set({ checkAuthstatus: RequestStatus.processing });
        try {
          const refreshToken = await getRefreshToken();
          if (!refreshToken)
            return set({
              checkAuthstatus: RequestStatus.fail,
              isAuthorized: false,
              accessToken: null,
            });

          const { data } = await authService.refresh(refreshToken);
          await Promise.all([
            setAccessToken(data.access_token),
            setRefreshToken(data.refresh_token),
          ]);
          set({
            accessToken: data.access_token,
            isAuthorized: true,
            checkAuthstatus: RequestStatus.success,
          });
        } catch (error) {
          set({
            checkAuthstatus: RequestStatus.fail,
            isAuthorized: false,
            accessToken: null,
          });
        }
      },
    }),
    {
      name: "auth",
    }
  )
);

export { useAuthStore };
