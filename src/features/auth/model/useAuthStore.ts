import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import RequestStatus from "../../shared/data/entities/RequestStatus";
import authService from "../data/services/authService";

interface AuthStore {
  status: RequestStatus;
  isAuthorized: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        status: RequestStatus.initial,
        isAuthorized: false,
        accessToken: null,
        refreshToken: "null",

        async login(email: string, passowrd: string) {
          set({ status: RequestStatus.processing });
          try {
            const response = await authService.login(email, passowrd);
            const { access_token, refresh_token } = response.data;
            set({
              isAuthorized: true,
              status: RequestStatus.success,
              accessToken: access_token,
              refreshToken: refresh_token,
            });
          } catch (error) {
            console.log(error);
            set({
              status: RequestStatus.fail,
              isAuthorized: false,
              accessToken: null,
              refreshToken: null,
            });
          }
        },

        async checkAuth() {
          set({ status: RequestStatus.processing });
          try {
            const refreshToken = get().refreshToken;
            if (!refreshToken)
              return set({
                status: RequestStatus.fail,
                isAuthorized: false,
                accessToken: null,
                refreshToken: null,
              });

            const {
              data: { access_token, refresh_token },
            } = await authService.refresh(refreshToken);
            set({
              accessToken: access_token,
              refreshToken: refresh_token,
              isAuthorized: true,
              status: RequestStatus.success,
            });
          } catch (error) {
            set({
              status: RequestStatus.fail,
              isAuthorized: false,
              accessToken: null,
              refreshToken: null,
            });
          }
        },
      }),
      {
        name: "auth",
        partialize: (state) => ({
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      }
    ),
    {
      name: "auth",
    }
  )
);
