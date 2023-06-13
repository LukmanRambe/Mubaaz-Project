import { LoginFormValues } from '../schema/AuthenticationSchema';

export type UserData = {
  id: string;
  username: string;
  role: string;
  role_name: string;
  created_at: string;
  updated_at: string;
};

export type AuthContextData = {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginFormValues: ({ username, password }: LoginFormValues) => void;
  login: () => void;
  logout: () => void;
  errorMessage: string;
  isLoading: boolean;
  expiredTokenTime: number;
  refreshToken: () => void;
  getUserData: React.Dispatch<string>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
};
