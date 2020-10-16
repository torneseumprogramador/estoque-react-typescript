import React, { createContext, useState, useCallback, useContext } from 'react';
import api from '../services/api';

interface User {
  name?: string;
  email: string;
  password: string;
}
interface AuthState {
  token: string;
  user: User;
}
interface AuthContextData {
  user: User;
  signIn({ email, password }: User): Promise<void>;
  logout(): void;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);
const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
export { AuthProvider, useAuth };
