export const getAccessToken = async (): Promise<string | null> =>
  localStorage.getItem("access_token");

export const getRefreshToken = async (): Promise<string | null> =>
  localStorage.getItem("refresh_token");

export const setAccessToken = async (value: string): Promise<void> =>
  localStorage.setItem("access_token", value);

export const setRefreshToken = async (value: string): Promise<void> =>
  localStorage.setItem("refresh_token", value);
