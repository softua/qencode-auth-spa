import RequestStatus from "@/features/shared/data/entities/RequestStatus";

export default interface AuthStore {
  status: RequestStatus;
  checkAuthstatus: RequestStatus;
  isAuthorized: boolean;
  accessToken: string | null;
  loginError: string | null;
  resetPasswordStatus: RequestStatus;
  resetPasswordError: string | null;

  login: (email: string, password: string) => Promise<void> | void;
  checkAuth: () => Promise<void> | void;
  passwordReset: (email: string) => Promise<void> | void;
}
