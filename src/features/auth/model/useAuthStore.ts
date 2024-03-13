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

const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      status: RequestStatus.initial,
      isAuthorized: false,
      accessToken: null,

      async login(email: string, passowrd: string) {
        set({ status: RequestStatus.processing });
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
          console.log(error);
          set({
            status: RequestStatus.fail,
            isAuthorized: false,
            accessToken: null,
          });
        }
      },

      async checkAuth() {
        set({ status: RequestStatus.processing });
        try {
          const refreshToken = await getRefreshToken();
          if (!refreshToken)
            return set({
              status: RequestStatus.fail,
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
            status: RequestStatus.success,
          });
        } catch (error) {
          set({
            status: RequestStatus.fail,
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

export default useAuthStore;
