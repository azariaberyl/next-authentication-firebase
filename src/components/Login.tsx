import { setUserCookie } from '@/utils';
import { auth, database } from '@/utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { off, onValue, ref } from 'firebase/database';
import Link from 'next/link';
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [users, setusers] = useState<any[]>();

  const onSubmitListener = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailStr = email.current?.value;
    const passStr = password.current?.value;

    if (emailStr !== undefined && passStr !== undefined) {
      console.log('Berhasil');
      return signInWithEmailAndPassword(auth, emailStr, passStr)
        .then((user) => {
          const email = user.user.email;
          const uid = user.user.uid;
          if (email !== null) setUserCookie({ email: email, uid: uid });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert('Something wrong, try again');
    }
  }, []);

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      const newUser = [];
      const data = snapshot.val();
      for (const key in data) {
        newUser.push(data[key]);
      }
      setusers(newUser);
    });

    return () => off(usersRef);
  }, []);
  return (
    <div>
      <div className='flex justify-center flex-col items-center'>
        <form
          className='flex flex-col gap-2 bg-white p-5 rounded shadow w-2/5 mt-28'
          onSubmit={onSubmitListener}
        >
          <input
            className='border border-gray-500 rounded-md p-2'
            ref={email}
            type='text'
            placeholder='Email'
            id='email'
          />
          <input
            className='border border-gray-500 rounded-md p-2'
            ref={password}
            type='password'
            placeholder='Password'
            id='password'
          />
          <button
            type='submit'
            className='w-fit place-self-end bg-slate-700 text-zinc-100 rounded p-2 mt-2 hover:bg-slate-800 hover:shadow-md'
          >
            Login
          </button>
        </form>
        <p className='my-2 text-gray-600 font-medium'>
          Don't have account yet?{' '}
          <Link className='text-blue-700' href='signup'>
            Sign up
          </Link>
        </p>
      </div>
      <div className='flex flex-wrap justify-around mt-12'>
        {users?.map(({ email, id, password }) => (
          <div className='bg-white my-2 rounded lg:w-1/5 p-3 shadow' key={id}>
            <p>{id} </p>
            <p>{email} </p>
            <p>{password} </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Login;
