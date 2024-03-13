export default interface AuthStore {
  status: RequestStatus;
  isAuthorized: boolean;
  accessToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  checkAuth: () => Promise<void>;
}
