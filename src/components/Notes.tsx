import { UserContext } from '@/contexts/User';
import { auth, database, writeNoteData } from '@/utils/firebase';
import { signOut } from 'firebase/auth';
import { onValue, ref } from 'firebase/database';
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

function Notes() {
  const [notes, setNotes] = useState<any[]>([]);

  const note = useRef<HTMLInputElement>(null);

  const signOutHandler = () => {
    signOut(auth);
  };

  const onSubmitListener = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    writeNoteData({ title: note.current?.value });
  };

  useEffect(() => {
    const usersRef = ref(database, 'notes');
    onValue(usersRef, (snapshot) => {
      const newUser = [];
      const data = snapshot.val();
      for (const key in data) {
        newUser.push(data[key]);
      }
      setNotes(newUser);
    });
  }, []);

  return (
    <div className='flex justify-center items-center flex-col w-full p-2'>
      <form className='flex flex-col w-3/5 gap-2' onSubmit={onSubmitListener}>
        <input
          className='p-1 rounded'
          ref={note}
          type='text'
          placeholder='Add note'
        />
        <button className='bg-zinc-600 text-white rounded-md' type='submit'>
          Add User
        </button>
      </form>
      <div>
        {notes?.map(({ title, id }) => (
          <div key={id}>
            <p>{id} </p>
            <p>{title} </p>
          </div>
        ))}
      </div>
      <button onClick={signOutHandler}>Sign Out</button>
    </div>
  );
}

export default Notes;
