"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { User } from "@/types/types";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (user) {
          setCurrentUser({
            uid: user.uid,
            email: user.email,
          });
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
