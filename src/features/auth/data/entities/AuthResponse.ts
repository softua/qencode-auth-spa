export default class AuthResponse {
  constructor(access_token: string, refresh_token: string) {
    this.access_token = access_token;
    this.refresh_token = refresh_token;
  }

  readonly access_token: string;
  readonly refresh_token: string;

  static fromApi(data: string): AuthResponse | undefined {
    try {
      const { access_token, refresh_token } = JSON.parse(data);
      return new AuthResponse(access_token, refresh_token);
    } catch (error) {
      console.error("AuthResponse map error", error);
    }
  }
}
