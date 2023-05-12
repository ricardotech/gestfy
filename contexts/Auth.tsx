import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { Axios, AxiosInstance, AxiosStatic } from "axios";
import {
  AuthContextData,
  AuthProviderProps,
  SignInCredentials,
  SignUpCredentials,
  User,
} from "../utils/types";
import validator from "email-validator";

export const USER = "@Auth:user";
export const TOKEN = "@Auth:token";

export const AuthContext = createContext({} as AuthContextData);

async function signOut() {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.removeItem(USER);
}

const api = axios.create();
const API_URL = "http://localhost:3000";
api.defaults.baseURL = API_URL;

async function handleApi() {
  const storaged_token = await AsyncStorage.getItem(TOKEN);

  api.defaults.headers.common["Authorization"] = `Bearer ${storaged_token}`;
  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (
        typeof error.response === "undefined" ||
        [401, 419].includes(error.response.status)
      ) {
        signOut();
      }
      return Promise.reject(error);
    }
  );
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string>("");

  const [error, setError] = useState<Error | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // trocar setUser(storagedUser)
  // manter storagedToken
  // get userId from token
  // request user by id
  // setUser

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem(USER);
      const storagedToken = await AsyncStorage.getItem(TOKEN);
      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setToken(JSON.stringify(TOKEN));
      }
    }

    loadStoragedData();
  }, []);

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        setError(null);
      }, 1250);
    }
  }, [error]);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      setIsLoading(true);

      if (!validator.validate(email)) {
        return "Email inválido";
      }

      if (password.length < 8) {
        return "Insira uma senha válida";
      }

      const res = await api
        .post("/auth/login", {
          email: email,
          password,
        })
        .then((response: any) => {
          if (response.status === 203) {
            return "Email ou senha inválidos";
          } else {
            setTimeout(async () => {
              await AsyncStorage.setItem(TOKEN, response.data.token);
              await AsyncStorage.setItem(
                USER,
                JSON.stringify(response.data.user)
              );
              setToken(response.data.token);
              setUser({
                id: response.data.user.id,
                email: response.data.user.email,
                role: response.data.user.role,
              });
            }, 1250);
            return "Usuário autenticado com sucesso!";
          }
        })
        .catch((error: any) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
      return res;
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    try {
      setIsLoading(true);

      await api
        .post("/auth/signup", {
          name,
          email,
          password,
        })
        .then((response: any) => {
          console.log(response.data);

          if (response.data.error) {
            setError(response.data.error);
          } else {
            setTimeout(async () => {
              AsyncStorage.setItem(TOKEN, response.data.data.token);
              AsyncStorage.setItem(
                USER,
                JSON.stringify(response.data.data.user)
              );
              setToken(response.data.data.token);
              setUser({
                id: response.data.data.user.id,
                name: response.data.data.user.name,
                email: response.data.data.user.email,
                role: response.data.data.user.role,
              });
            }, 1000);
          }
        })
        .catch((error: any) => {
          setError(error);
        })
        .finally(() => setIsLoading(false));
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function signOut() {
    AsyncStorage.removeItem(USER).then(() => {
      setUser(null);
    });
    AsyncStorage.removeItem(TOKEN).then(() => {
      setUser(null);
    });
    // AsyncStorage.clear().then(() => {});
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        signIn,
        signUp,
        signOut,
        isLoading,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth, signOut, handleApi };
