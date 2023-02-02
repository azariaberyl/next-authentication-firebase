// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, off, onValue, push, ref, set } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase();

export function writeUserData(data: any) {
  // ref(db, path) is the database refference and path where to store the data
  const userRef = ref(database, 'users');
  // push(ref) will help to generate id
  const newRef = push(userRef);

  set(newRef, {
    ...data,
    id: newRef.key,
  });
}

export function writeNoteData(data: any) {
  const noteRef = ref(database, 'notes');
  const newRef = push(noteRef);

  set(newRef, {
    ...data,
    id: newRef.key,
  });
}

export function getUserData() {
  const usersRef = ref(database, 'users');
  onValue(usersRef, (snapshot) => {
    const newUser = [];
    const data = snapshot.val();
    for (const key in data) {
      newUser.push(data[key]);
    }
  });
  return () => off(usersRef);
}
