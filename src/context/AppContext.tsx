import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { UserRole } from '../types';

interface AppUser {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  region: string;
}

interface AppContextType {
  user: AppUser | null;
  setUser: (u: AppUser | null) => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  setUser: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
