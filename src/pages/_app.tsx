import { UserProvider } from '@/contexts/User';
import '@/styles/globals.css';
import { UserData } from '@/types';
import { getUserCookie, removeUserCookie } from '@/utils';
import { auth } from '@/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import type { AppProps } from 'next/app';
import { useEffect, useMemo, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<UserData | null>(getUserCookie());

  const userContextVal = useMemo(
    () => ({
      user,
    }),
    [user]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const newCookie: UserData = {
          email: user.email ? user.email : '',
          uid: user.uid,
        };
        setUser(newCookie);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        removeUserCookie();
        setUser(null);
        console.log('No user');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserProvider value={userContextVal}>
      <Component {...pageProps} />
    </UserProvider>
  );
}
