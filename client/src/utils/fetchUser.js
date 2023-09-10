import { isExpired } from './helpers';

export const fetchUser = () => {
  const userInfo =
    localStorage.getItem('user') !== undefined
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  if (isExpired(userInfo?.exp)) {
    localStorage.clear();
    return null;
  }

  return userInfo;
};
