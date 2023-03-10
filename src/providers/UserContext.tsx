/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { createContext, ReactNode, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../services';

export interface iChildren {
  children: ReactNode;
}

export interface iLoginData {
  email: string;
  password: string;
}

export interface iRegister {
  email: string;
  password: string;
  name?: string;
  confirmPass?: string;
}

export interface iUser {
  id: string;
  name: string;
  email: string;
}

interface iLogged {
  accesToken: string;
  user: iUser;
}

interface iUserContext {
  loginSubmit: (data: iLoginData) => void;
  login: (userInfo: iLoginData) => Promise<void>;
  logged: iLogged | null;
  registerSubmit: (data: iRegister) => void;
  registerUser: (newUser: iRegister) => Promise<void>;
  user: iLoginData | null;
  newUserInfo: iRegister | null;
  logout: () => void;
}

export const UserContext = createContext<iUserContext>({} as iUserContext);

export const UserProvider = ({ children }: iChildren) => {
  const [user, setUser] = useState<iLoginData | null>(null);
  const [logged, setLogin] = useState<iLogged | null>(null);
  const [newUserInfo, setNewUser] = useState<iRegister | null>(null);
  const navigate = useNavigate();

  const loginSubmit: SubmitHandler<iLoginData> = (data) => {
    setUser(data);
  };

  const login = async (userInfo: iLoginData) => {
    try {
      const response = await api.post('login', userInfo);
      setLogin(response.data);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      navigate('/shop');
    } catch (error) {
      console.error(error);
    }
  };

  const registerSubmit: SubmitHandler<iRegister> = (data) => {
    if (data) {
      // eslint-disable-next-line no-param-reassign
      delete data.confirmPass;
    }
    setNewUser(data);
  };

  const registerUser = async (newUser: iRegister) => {
    try {
      const response = await api.post('users', newUser);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('@TOKEN');
    setLogin(null)
    setUser(null)
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        loginSubmit,
        user,
        login,
        logged,
        registerSubmit,
        registerUser,
        newUserInfo,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
