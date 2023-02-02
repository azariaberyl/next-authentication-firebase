import { createContext } from 'react';

export const UserContext = createContext<any>(null);

export const UserProvider = UserContext.Provider;
