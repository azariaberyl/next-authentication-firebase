import { UserData } from '@/types';
import Cookies from 'js-cookie';

function getUserCookie(): UserData | null {
  const data = Cookies.get('user-data');
  if (data !== undefined) return JSON.parse(data);
  return null;
}

function setUserCookie(value: UserData) {
  const strVal = JSON.stringify(value);
  Cookies.set('user-data', strVal, { expires: 7 });
}

function removeUserCookie() {
  Cookies.remove('user-data');
}

export { getUserCookie, setUserCookie, removeUserCookie };
