const tokenKey = () => 'admin_access_token';

export const getAccessToken = () => {
  return localStorage.getItem(tokenKey());
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(tokenKey(), token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(tokenKey());
}
