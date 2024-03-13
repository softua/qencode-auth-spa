export default interface AuthStore {
  status: RequestStatus;
  checkAuthstatus: RequestStatus;
  isAuthorized: boolean;
  accessToken: string | null;
  loginError: string | null;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}
