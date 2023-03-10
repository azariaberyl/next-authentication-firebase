import Login from '@/components/Login';
import Notes from '@/components/Notes';
import { UserContext } from '@/contexts/User';
import { auth } from '@/utils/firebase';
import { User } from 'firebase/auth';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const user = auth.currentUser;

  return {
    props: { user },
  };
};

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='xl:w-[1200px] mx-auto'>
        {user !== null ? <Notes /> : <Login />}
      </main>
    </>
  );
}
