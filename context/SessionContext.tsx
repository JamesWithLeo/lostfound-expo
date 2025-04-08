import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { useRouter } from "expo-router";
interface IUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role: "user" | "admin";
  createdAt: Date | null;
  birthDate: string | null;
  gender: "male" | "female" | null;
  email: string | null;
  googleId: string | null;
  facebookId: string | null;
  githubId: string | null;
}
function isIUser(obj: any): obj is IUser {
  return (
    obj &&
    typeof obj.id === "string" &&
    (typeof obj.firstName === "string" || obj.firstName === null) &&
    (typeof obj.lastName === "string" || obj.lastName === null) &&
    (obj.role === "user" || obj.role === "admin") &&
    (obj.createdAt === null || obj.createdAt instanceof Date) &&
    (typeof obj.birthDate === "string" || obj.birthDate === null) &&
    (obj.gender === "male" || obj.gender === "female" || obj.gender === null) &&
    (typeof obj.email === "string" || obj.email === null) &&
    (typeof obj.googleId === "string" || obj.googleId === null) &&
    (typeof obj.facebookId === "string" || obj.facebookId === null) &&
    (typeof obj.githubId === "string" || obj.githubId === null)
  );
}
interface ISession {
  login: (accessToken: string, user: IUser) => void;
  logout: () => void;
  session: { accessToken: string; user: IUser } | null;
}

const SessionContext = createContext<ISession>({
  login: async () => {},
  logout: async () => {},
  session: null,
});

export const useSession = () => {
  return useContext(SessionContext);
};

const getCurrentSesion = (isWeb: boolean) => {
  const accessToken = localStorage.getItem("accessToken") ?? null;
  const localUser = localStorage.getItem("user") ?? null;

  if (!accessToken || !localUser) {
    return null;
  }
  const user = JSON.parse(localUser);
  if (!isIUser(user)) {
    return null;
  }
  return isWeb
    ? {
        accessToken,
        user,
      }
    : null;
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isWeb = Platform.OS === "web";

  const [session, setSession] = useState<{
    accessToken: string;
    user: IUser;
  } | null>(getCurrentSesion(isWeb));
  const login = async (accessToken: string, user: IUser) => {
    if (isWeb) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      await SecureStore.setItemAsync("accessToken", accessToken);
      await SecureStore.setItemAsync("user", JSON.stringify(user));
    }
    setSession({ accessToken, user });
    router.navigate("/");
  };

  const logout = async () => {
    if (isWeb) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    } else {
      await SecureStore.deleteItemAsync("accessToken");
      await SecureStore.deleteItemAsync("user");
    }
    setSession(null);
  };

  useEffect(() => {
    const loadSession = async () => {
      let accessToken;
      let userData;
      if (isWeb) {
        accessToken = localStorage.getItem("accessToken");
        userData = localStorage.getItem("user");
      } else {
        accessToken = await SecureStore.getItemAsync("accessToken");
        userData = await SecureStore.getItemAsync("user");
      }
      if (accessToken && userData) {
        setSession({ accessToken, user: JSON.parse(userData) });
      }
    };
    loadSession();
  }, []);

  return (
    <SessionContext.Provider value={{ login, logout, session }}>
      {children}
    </SessionContext.Provider>
  );
};
