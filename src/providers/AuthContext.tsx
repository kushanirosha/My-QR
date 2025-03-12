import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  id: string;
}

interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get<{ user: { id: string; name: string; email: string } }>(
            'http://localhost:5000/api/users/me',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { user: userData } = response.data;
          if (userData) {
            setUser(userData);
          } else {
            throw new Error("Invalid user data in response");
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;