import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => {
    setUser(user);

    AsyncStorage.setItem("userInfo", JSON.stringify(user));

    authStorage.storeToken(user.access_token);
  };
  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  };

  return { user, logIn, logOut };
};
