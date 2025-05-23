import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
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
// function isIUser(obj: any): obj is IUser {
//   return (
//     obj &&
//     typeof obj.id === "string" &&
//     (typeof obj.firstName === "string" || obj.firstName === null) &&
//     (typeof obj.lastName === "string" || obj.lastName === null) &&
//     (obj.role === "user" || obj.role === "admin") &&
//     (obj.createdAt === null || obj.createdAt instanceof Date) &&
//     (typeof obj.birthDate === "string" || obj.birthDate === null) &&
//     (obj.gender === "male" || obj.gender === "female" || obj.gender === null) &&
//     (typeof obj.email === "string" || obj.email === null) &&
//     (typeof obj.googleId === "string" || obj.googleId === null) &&
//     (typeof obj.facebookId === "string" || obj.facebookId === null) &&
//     (typeof obj.githubId === "string" || obj.githubId === null)
//   );
// }
interface ISession {
  login: (accessToken: string, user: IUser) => void;
  logout: () => void;
  session: { accessToken: string; user: IUser } | null;
  isLoading: boolean;
  updateUserProfile: (updates: Partial<IUser>) => void;
}

const SessionContext = createContext<ISession>({
  login: async () => {},
  logout: async () => {},
  session: null,
  isLoading: true,
  updateUserProfile: (update: {}) => undefined,
});

export const useSession = () => {
  return useContext(SessionContext);
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<{
    accessToken: string;
    user: IUser;
  } | null>(null);

  const login = async (accessToken: string, user: IUser) => {
    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("user", JSON.stringify(user));
    setSession({ accessToken, user });
    router.navigate("/");
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("accessToken");
    await SecureStore.deleteItemAsync("user");

    setSession(null);
  };
  const updateUserProfile = (updates: Partial<IUser>) => {
    const currentUser = session?.user;
    if (!currentUser) return;

    const updatedUser = { ...currentUser, ...updates };
    SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    setSession((prev) => (prev ? { ...prev, user: updatedUser } : prev));
  };

  useEffect(() => {
    const loadSession = async () => {
      let accessToken;
      let userData;

      accessToken = await SecureStore.getItemAsync("accessToken");
      userData = await SecureStore.getItemAsync("user");
      if (accessToken && userData) {
        const user = JSON.parse(userData);
        setSession({ accessToken, user: user });
      }
    };
    loadSession().then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <SessionContext.Provider
      value={{ login, logout, session, isLoading, updateUserProfile }}
    >
      {children}
    </SessionContext.Provider>
  );
};
