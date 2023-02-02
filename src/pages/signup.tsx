import { UserContext } from '@/contexts/User';
import { writeUserData, database, auth } from '@/utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, onValue, off } from 'firebase/database';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

function Signup() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const { userUpdate } = useContext(UserContext);
  const route = useRouter();

  const onSubmitListener = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailStr = email.current?.value;
    const passStr = password.current?.value;
    if (emailStr !== undefined && passStr !== undefined) {
      console.log('Berhasil');
      createUserWithEmailAndPassword(auth, emailStr, passStr)
        .then((userCredentials) => {
          console.log(userCredentials);
          userUpdate(userCredentials);
          route.push('/');
        })
        .catch((e) => alert(e));
    } else {
      alert('Something wrong, try again');
    }
  }, []);

  return (
    <main className='xl:w-[1200px] mx-auto'>
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
            Add User
          </button>
        </form>
        <p className='my-2 text-gray-600 font-medium'>
          Already have account?{' '}
          <Link className='text-blue-700' href='/'>
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;
